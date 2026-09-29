import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EntityManager, EntityTarget, QueryFailedError, Repository } from 'typeorm';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentEvents } from './events/student.events';
import {
  extractAscgParticipation,
  extractCbcParticipation,
  extractScParticipation,
} from './student.utils';
import { AscgParticipation } from 'src/ascg-participation/entities/ascg-participation.entity';
import { CbcParticipation } from 'src/cbc-participation/entities/cbc-participation.entity';
import { ProgramParticipation } from 'src/program-participation/entities/program-participation.entity';
import { ScParticipation } from 'src/sc-participation/entities/sc-participation.entity';
import { AscgProfile } from 'src/ascg-profile/entities/ascg-profile.entity';
import { CbcProfile } from 'src/cbc-profile/entities/cbc-profile.entity';

// ---------------------------------------------------------------------------
// Helpers / config
// ---------------------------------------------------------------------------

/** DTO plus the optional legacy fields the old code read via `as any`. */
type StudentInput = CreateStudentDto & {
  program?: string;
  year?: number | string;
};

interface ProgramConfig {
  /** Pulls the program-specific fields out of the big DTO. */
  extract: (dto: CreateStudentDto) => Record<string, any>;
  participation: EntityTarget<any>;
  profile?: EntityTarget<any>;
  /** Event emitted when an EXISTING student is added to this program. */
  event: string;
}

const ASCG_CONFIG: ProgramConfig = {
  extract: extractAscgParticipation,
  participation: AscgParticipation,
  profile: AscgProfile,
  event: StudentEvents.ASCG_STUDENT_CREATED,
};

/** Adding a new program = adding one entry here. */
const PROGRAM_CONFIG: Record<string, ProgramConfig> = {
  ascg: ASCG_CONFIG,
  outreach: ASCG_CONFIG,
  cbc: {
    extract: extractCbcParticipation,
    participation: CbcParticipation,
    profile: CbcProfile,
    event: StudentEvents.CBC_STUDENT_CREATED,
  },
  sc: {
    extract: extractScParticipation,
    participation: ScParticipation,
    event: StudentEvents.SC_STUDENT_CREATED,
  },
};

/** Works for SQLite and Postgres. */
function isUniqueViolation(err: unknown): boolean {
  if (!(err instanceof QueryFailedError)) return false;
  const driverError = (err as any).driverError;
  return (
    driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE' ||
    driverError?.code === '23505' || // Postgres unique_violation
    !!driverError?.message?.includes('UNIQUE constraint failed') ||
    !!driverError?.message?.includes('duplicate key')
  );
}

function calculateAge(dateOfBirth?: string | Date | null): number | null {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  const hadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  return today.getFullYear() - dob.getFullYear() - (hadBirthdayThisYear ? 0 : 1);
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private toValidYear(value: unknown, fieldName: string): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      throw new BadRequestException(`${fieldName} must be a valid year`);
    }

    return parsed;
  }

  // -------------------------------------------------------------------------
  // Create
  // -------------------------------------------------------------------------

  async create(createStudentDto: CreateStudentDto) {
    // Normalise on a copy so the DB row AND the emitted events see the same data,
    // without mutating the caller's object.
    const input = {
      ...createStudentDto,
      email: createStudentDto.email?.trim() || undefined,
    } as StudentInput;
    // Single source of truth for the program (old code mixed programId / program).
    const programId = input.programId ?? input.program;

    try {
      const student = await this.studentRepository.manager.transaction((manager) =>
        this.createStudentWithParticipations(manager, input, programId),
      );

      // Emit only after the transaction has committed.
      this.eventEmitter.emit(StudentEvents.STUDENT_CREATED, {
        ...input,
        studentId: student.id,
      });

      return student;
    } catch (error) {
      // Student already exists -> treat as "add existing student to a program".
      if (isUniqueViolation(error)) {
        const result = await this.addToExistingStudent(input, programId);
        if (result) return result;
      }

      this.logger.error(
        `Failed to create student ${input.firstName} ${input.lastName}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /** Happy path: student + generic participation + program-specific rows, atomically. */
  private async createStudentWithParticipations(
    manager: EntityManager,
    input: StudentInput,
    programId?: string,
  ) {
    const yearJoined = this.toValidYear(input.yearJoined, 'yearJoined');

    const student = await manager.save(
      manager.create(Student, {
        ...input,
        email: input.email?.trim() || undefined, // '' -> undefined so it's stored as null
        yearJoined,
      } as any),
    );

    if (!programId) return student;

    // Generic program participation.
    const year = this.toValidYear(input.year ?? yearJoined, 'year');
    await this.saveIgnoringDuplicate(manager, async (m) => {
      await m.save(
        m.create(ProgramParticipation, {
          studentId: student.id,
          programId: String(programId),
          year,
        } as any),
      );
    });

    // Program-specific rows (ASCG / CBC / SC), driven by config.
    const config = PROGRAM_CONFIG[programId];
    if (config) {
      await this.saveIgnoringDuplicate(manager, async (m) => {
        const extracted = config.extract(input);
        await m.save(
          m.create(config.participation, {
            ...extracted,
            studentId: student.id,
            year: this.toValidYear(extracted.year ?? yearJoined, 'year'),
          }),
        );

        if (config.profile) {
          await m.save(
            m.create(config.profile, { ...input, studentId: student.id } as any),
          );
        }
      });
    }

    return student;
  }

  /**
   * Runs `work` in a nested transaction (SAVEPOINT) and ignores unique-constraint
   * errors, so a swallowed error can't poison the outer transaction (an issue on
   * Postgres with plain try/catch).
   */
  private async saveIgnoringDuplicate(
    manager: EntityManager,
    work: (manager: EntityManager) => Promise<void>,
  ) {
    try {
      await manager.transaction(work);
    } catch (err) {
      if (!isUniqueViolation(err)) throw err;
    }
  }

  /** Duplicate-student path. Returns null if the existing student can't be found. */
  private async addToExistingStudent(input: StudentInput, programId?: string) {
    const student = await this.studentRepository.findOne({
      where: {
        firstName: input.firstName,
        lastName: input.lastName,
        dateOfBirth: new Date(input.dateOfBirth),
      },
    });

    if (!student) return null;

    this.eventEmitter.emit(StudentEvents.STUDENT_CREATED, {
      ...input,
      studentId: student.id,
    });

    const config = programId ? PROGRAM_CONFIG[programId] : undefined;
    if (config) {
      this.eventEmitter.emit(config.event, {
        ...config.extract(input),
        studentId: student.id,
        programId,
      });
    }

    return { msg: 'Participations Added' };
  }

  async createMany(createStudentDtos: CreateStudentDto[]) {
    const results: any[] = [];
    const skipped: CreateStudentDto[] = [];
    const failed: { index: number; dto: CreateStudentDto; error: string }[] = [];

    // Sequential on purpose: each student is its own transaction, and a bad row
    // must not abort the rest of the batch.
    for (const [index, dto] of createStudentDtos.entries()) {
      try {
        results.push(await this.create(dto));
      } catch (error) {
        if (isUniqueViolation(error)) {
          skipped.push(dto);
        } else {
          const message = error instanceof Error ? error.message : String(error);
          failed.push({ index, dto, error: message });
        }
      }
    }

    // create() returns { msg } for students that already existed, a Student otherwise.
    const existing = results.filter((r) => r && 'msg' in r).length;

    const summary = {
      total: createStudentDtos.length,
      created: results.length - existing,
      existing,
      skipped: skipped.length,
      failed: failed.length,
    };

    this.logger.log(`createMany finished: ${JSON.stringify(summary)}`);

    return { summary, results, skipped, failed };
  }

  // -------------------------------------------------------------------------
  // Read
  // -------------------------------------------------------------------------

  private toSearchResult(student: Student) {
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      age: calculateAge(student.dateOfBirth),
      email: student.email,
      phone: student.phone,
      school: student.cbcProfile?.school || student.ascgProfile?.school?.school || null,
    };
  }

  async findAll(name?: string, firstName?: string, lastName?: string) {
    const qb = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.ascgProfile', 'ascgProfile')
      .leftJoinAndSelect('ascgProfile.school', 'school')
      .leftJoinAndSelect('student.cbcProfile', 'cbcProfile')
      .leftJoinAndSelect('student.ascgParticipation', 'ascgParticipation')
      .leftJoinAndSelect('student.cbcParticipation', 'cbcParticipation')
      .leftJoinAndSelect('student.scParticipation', 'scParticipation')
      .leftJoinAndSelect('student.programParticipation', 'programParticipation');

    const trimmedName = name?.trim();
    const trimmedFirstName = firstName?.trim();
    const trimmedLastName = lastName?.trim();

    if (trimmedName) {
      const parts = trimmedName.toLowerCase().split(/\s+/).filter(Boolean);

      if (parts.length > 1) {
        // Match "first last" in either order.
        qb.andWhere(
          '((LOWER(student.firstName) LIKE :firstToken AND LOWER(student.lastName) LIKE :lastToken) OR ' +
            '(LOWER(student.firstName) LIKE :lastToken AND LOWER(student.lastName) LIKE :firstToken))',
          {
            firstToken: `%${parts[0]}%`,
            lastToken: `%${parts[parts.length - 1]}%`,
          },
        );
      } else {
        qb.andWhere(
          '(LOWER(student.firstName) LIKE :nameTerm OR LOWER(student.lastName) LIKE :nameTerm)',
          { nameTerm: `%${parts[0]}%` },
        );
      }
    }

    if (trimmedFirstName) {
      qb.andWhere('LOWER(student.firstName) LIKE :firstName', {
        firstName: `%${trimmedFirstName.toLowerCase()}%`,
      });
    }

    if (trimmedLastName) {
      qb.andWhere('LOWER(student.lastName) LIKE :lastName', {
        lastName: `%${trimmedLastName.toLowerCase()}%`,
      });
    }

    const [students, total] = await qb.getManyAndCount();
    return [students.map((student) => this.toSearchResult(student)), total];
  }

  async findOne(id: string) {
    return await this.studentRepository.findOneOrFail({
      where: { id },
      relations: {
        ascgProfile: true,
        cbcProfile: true,
        ascgParticipation: true,
        cbcParticipation: true,
        scParticipation: true,
        programParticipation: true,
      },
    });
  }

  // -------------------------------------------------------------------------
  // Update / delete
  // -------------------------------------------------------------------------

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.studentRepository.update(id, updateStudentDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.studentRepository.delete(id);
    return { success: true };
  }

  async deleteAll() {
    await this.studentRepository.deleteAll();
    return { success: true };
  }
}