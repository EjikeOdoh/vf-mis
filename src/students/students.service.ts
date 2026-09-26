import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StudentEvents } from './events/student.events';
import { extractAscgParticipation, extractCbcParticipation, extractScParticipation } from './student.utils';
import pLimit from 'p-limit';
import { AscgParticipation } from 'src/ascg-participation/entities/ascg-participation.entity';
import { CbcParticipation } from 'src/cbc-participation/entities/cbc-participation.entity';
import { ProgramParticipation } from 'src/program-participation/entities/program-participation.entity';
import { ScParticipation } from 'src/sc-participation/entities/sc-participation.entity';
import { AscgProfile } from 'src/ascg-profile/entities/ascg-profile.entity';
import { CbcProfile } from 'src/cbc-profile/entities/cbc-profile.entity';

const limit = pLimit(5); // Limit concurrency to 5

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(AscgParticipation) private readonly ascgParticipationRepo: Repository<AscgParticipation>,
    @InjectRepository(CbcParticipation) private readonly cbcParticipationRepo: Repository<CbcParticipation>,
    @InjectRepository(ProgramParticipation) private readonly programParticipationRepo: Repository<ProgramParticipation>,
    @InjectRepository(ScParticipation) private readonly scParticipationRepo: Repository<ScParticipation>,
    @InjectRepository(AscgProfile) private readonly ascgProfileRepo: Repository<AscgProfile>,
    @InjectRepository(CbcProfile) private readonly cbcProfileRepo: Repository<CbcProfile>,
  ) { }

  async create(createStudentDto: CreateStudentDto) {

    const { programId } = createStudentDto;

    try {

      // Run parent + child saves in a single transaction to avoid FK race conditions
      const newStudent = await this.studentRepository.manager.transaction(async (manager) => {
        const studentEntity = manager.create(Student, {
          ...createStudentDto,
          email: (createStudentDto.email || '').trim() || undefined,
          dateOfBirth: new Date(createStudentDto.dateOfBirth),
          yearJoined: Number((createStudentDto as any).yearJoined ?? createStudentDto.yearJoined),
        } as any);

        const savedStudent = await manager.save(studentEntity);

        // helper to detect unique constraint errors
        const isUnique = (err: unknown) =>
          err instanceof QueryFailedError && ((err as any).driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE' || (err as any).driverError?.message?.includes('UNIQUE constraint failed'));

        // program participation (coerce year to number)
        try {
          const programIdVal = (createStudentDto as any).programId || (createStudentDto as any).program;
          if (programIdVal) {
            const prog = manager.create(ProgramParticipation, {
              studentId: savedStudent.id,
              programId: String(programIdVal),
              year: Number((createStudentDto as any).year || (createStudentDto as any).yearJoined || createStudentDto.yearJoined),
            } as any);
            console.debug('[StudentsService.create:tx] creating ProgramParticipation with studentId=%s prog=%o', savedStudent.id, prog);
            await manager.save(prog);
            console.debug('[StudentsService.create:tx] saved ProgramParticipation for studentId=%s', savedStudent.id);
          }
        } catch (err) {
          console.error('[StudentsService.create:tx] ProgramParticipation error for studentId=%s error=%o', savedStudent.id ?? err);
          if (!isUnique(err)) throw err;
        }

        // ASCG specific
        try {
          if (programId && (programId === 'ascg' || programId === 'outreach')) {
            const dto = extractAscgParticipation(createStudentDto) as any;
            dto.studentId = savedStudent.id;
            dto.year = Number(dto.year || (createStudentDto as any).yearJoined);
            const ascg = manager.create(AscgParticipation, dto);
            await manager.save(ascg);

            const ascgProfile = manager.create(AscgProfile, { ...createStudentDto, studentId: savedStudent.id } as any);
            await manager.save(ascgProfile);
          }
        } catch (err) {
          if (!isUnique(err)) throw err;
        }

        // CBC specific
        try {
          if (programId && programId === 'cbc') {
            const dto = extractCbcParticipation(createStudentDto) as any;
            dto.studentId = savedStudent.id;
            dto.year = Number(dto.year || (createStudentDto as any).yearJoined);
            const cbc = manager.create(CbcParticipation, dto);
            await manager.save(cbc);

            const cbcProfile = manager.create(CbcProfile, { ...createStudentDto, studentId: savedStudent.id } as any);
            await manager.save(cbcProfile);
          }
        } catch (err) {
          if (!isUnique(err)) throw err;
        }

        // SC specific
        try {
          if (programId && programId === 'sc') {
            const dto = extractScParticipation(createStudentDto) as any;
            dto.studentId = savedStudent.id;
            dto.year = Number(dto.year || (createStudentDto as any).yearJoined);
            const sc = manager.create(ScParticipation, dto);
            await manager.save(sc);
          }
        } catch (err) {
          if (!isUnique(err)) throw err;
        }

        return savedStudent;
      });

      // Emit the general student created event after transaction commits
      this.eventEmitter.emit(StudentEvents.STUDENT_CREATED, { ...createStudentDto, studentId: newStudent.id });

      return newStudent;

    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE' &&
        (error as any).driverError?.message?.includes('UNIQUE constraint failed')
      ) {
        const student = await this.studentRepository
          .createQueryBuilder('student')
          .where('student.firstName = :firstName', {
            firstName: createStudentDto.firstName,
          })
          .andWhere('student.lastName = :lastName', {
            lastName: createStudentDto.lastName,
          })
          .andWhere('student.dateOfBirth = :dateOfBirth', {
            dateOfBirth: createStudentDto.dateOfBirth,
          })
          .getOne();

        if (student) {
          this.eventEmitter.emit(StudentEvents.STUDENT_CREATED, { ...createStudentDto, studentId: student.id });

          if (programId && (programId === 'ascg' || programId === 'outreach')) {
            const dto = extractAscgParticipation(createStudentDto);
            this.eventEmitter.emit(StudentEvents.ASCG_STUDENT_CREATED, { ...dto, studentId: student.id, programId });
          }

          if (programId && programId === 'cbc') {
            const dto = extractCbcParticipation(createStudentDto);
            this.eventEmitter.emit(StudentEvents.CBC_STUDENT_CREATED, { ...dto, studentId: student.id, programId });
          }

          if (programId && programId === 'sc') {
            const dto = extractScParticipation(createStudentDto);
            this.eventEmitter.emit(StudentEvents.SC_STUDENT_CREATED, { ...dto, programId, studentId: student.id });
          }

          return student;
        }
      };
      console.log(error);
      throw error;
    }
  }

  async createMany(createStudentDtos: CreateStudentDto[]) {
    const tasks = createStudentDtos.map(dto => limit(async () => {
      dto.email = (dto.email || '').trim() || undefined;
      return this.create(dto);
    }));
    return Promise.all(tasks);
  }

  async findAll() {
    return await this.studentRepository.findAndCount();
  }

  async findOne(id: string) {
    return await this.studentRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.studentRepository.update(id, updateStudentDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.studentRepository.delete(id);
    return { success: true };
  }

  async deleteAll() {
    await this.studentRepository.deleteAll()
    return { success: true };
  }
}
