import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StudentEvents } from './events/student.events';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  create(createStudentDto: CreateStudentDto) {
    this.eventEmitter.emit(StudentEvents.STUDENT_CREATED, createStudentDto)
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
