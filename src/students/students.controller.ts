import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WriteProtected } from 'src/auth/decorators/write-protected.decorator';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @WriteProtected()
  @Post()
  @ApiOperation({ summary: 'Create a student record' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created.' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @WriteProtected()
  @Post('batch')
  @ApiOperation({ summary: 'Create multiple student records' })
  @ApiBody({ type: [CreateStudentDto] })
  @ApiResponse({ status: 201, description: 'Students created.' })
  createMany(@Body() createStudentDtos: CreateStudentDto[]) {
    return this.studentsService.createMany(createStudentDtos);
  }

  @Get()
  @ApiOperation({ summary: 'List students' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Filter by full name' })
  @ApiQuery({ name: 'firstName', required: false, type: String, description: 'Filter by first name' })
  @ApiQuery({ name: 'lastName', required: false, type: String, description: 'Filter by last name' })
  @ApiResponse({ status: 200, description: 'Students returned.' })
  findAll(
    @Query('name') name?: string,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
  ) {
    return this.studentsService.findAll(name, firstName, lastName);
  }

  @WriteProtected()
  @Delete()
  @ApiOperation({ summary: 'Delete all student records' })
  @ApiResponse({ status: 200, description: 'All student records deleted.' })
  delete() {
    return this.studentsService.deleteAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one student by id' })
  @ApiParam({ name: 'id', type: String, description: 'Student id' })
  @ApiResponse({ status: 200, description: 'Student returned.' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @WriteProtected()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a student record' })
  @ApiParam({ name: 'id', type: String, description: 'Student id' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated.' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @WriteProtected()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student record' })
  @ApiParam({ name: 'id', type: String, description: 'Student id' })
  @ApiResponse({ status: 200, description: 'Student deleted.' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

}
