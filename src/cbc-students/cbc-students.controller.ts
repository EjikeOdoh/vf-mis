import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CbcStudentsService } from './cbc-students.service';
import { CreateCbcStudentDto } from './dto/create-cbc-student.dto';
import { UpdateCbcStudentDto } from './dto/update-cbc-student.dto';

@Controller('cbc-students')
export class CbcStudentsController {
  constructor(private readonly cbcStudentsService: CbcStudentsService) {}

  @Post()
  create(@Body() createCbcStudentDto: CreateCbcStudentDto) {
    return this.cbcStudentsService.create(createCbcStudentDto);
  }

  @Get()
  findAll() {
    return this.cbcStudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cbcStudentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCbcStudentDto: UpdateCbcStudentDto) {
    return this.cbcStudentsService.update(+id, updateCbcStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cbcStudentsService.remove(+id);
  }
}
