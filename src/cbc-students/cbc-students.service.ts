import { Injectable } from '@nestjs/common';
import { CreateCbcStudentDto } from './dto/create-cbc-student.dto';
import { UpdateCbcStudentDto } from './dto/update-cbc-student.dto';

@Injectable()
export class CbcStudentsService {
  create(createCbcStudentDto: CreateCbcStudentDto) {
    console.log(createCbcStudentDto)
    return 'This action adds a new cbcStudent';
  }

  findAll() {
    return `This action returns all cbcStudents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cbcStudent`;
  }

  update(id: number, updateCbcStudentDto: UpdateCbcStudentDto) {
    return `This action updates a #${id} cbcStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} cbcStudent`;
  }
}
