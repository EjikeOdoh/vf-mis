import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StudentEvents } from './events/student.events';
import { extractAscgParticipation, extractAscgProfile, extractCbcParticipation, extractCbcProfile, extractScParticipation } from './student.utils';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    private readonly eventEmitter: EventEmitter2
  ) { }

  async create(createStudentDto: CreateStudentDto) {

    const { programId } = createStudentDto;

    try {

      const student = this.studentRepository.create(createStudentDto);
      const newStudent = await this.studentRepository.save(student);

      this.eventEmitter.emit(StudentEvents.STUDENT_CREATED, { ...createStudentDto, studentId: newStudent.id });

      if (programId && (programId === 'ascg' || programId === 'outreach')) {
        const dto = extractAscgParticipation(createStudentDto);
        this.eventEmitter.emit(StudentEvents.ASCG_STUDENT_CREATED, { ...dto, studentId: newStudent.id, programId });

      }

      if (programId && programId === 'cbc') {
        const dto = extractCbcParticipation(createStudentDto);
        this.eventEmitter.emit(StudentEvents.CBC_STUDENT_CREATED, { ...dto, studentId: newStudent.id, programId });
      }

      if (programId && programId === 'sc') {
        const dto = extractScParticipation(createStudentDto);
        this.eventEmitter.emit(StudentEvents.SC_STUDENT_CREATED, { ...dto, programId, studentId: newStudent.id });
      }

    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).driverError?.code === 'SQLITE_CONSTRAINT_UNIQUE' &&
        (error as any).driverError?.message?.includes('UNIQUE constraint failed')
      ) {
        const student = await this.studentRepository
          .createQueryBuilder('student')
          .where('student.first_name = :firstName', {
            firstName: createStudentDto.firstName,
          })
          .andWhere('student.last_name = :lastName', {
            lastName: createStudentDto.lastName,
          })
          .andWhere('student.date_of_birth = :dateOfBirth', {
            dateOfBirth: createStudentDto.dateOfBirth,
          })
          .getOne();
        console.log(student);

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
        }
      }
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    return await this.studentRepository.find();
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
