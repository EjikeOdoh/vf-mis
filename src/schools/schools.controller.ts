import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WriteProtected } from 'src/auth/decorators/write-protected.decorator';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Category } from 'src/common/enum';

export type SchoolsFilter = {
  category?: Category
}

@ApiTags('Schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @WriteProtected()
  @Post()
  @ApiOperation({ summary: 'Create a school' })
  @ApiBody({ type: CreateSchoolDto })
  @ApiResponse({ status: 201, description: 'School created.' })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @WriteProtected()
  @Delete()
  @ApiOperation({ summary: 'Delete all schools' })
  @ApiResponse({ status: 200, description: 'All schools deleted.' })
  deleteAll() {
    return this.schoolsService.removeAll();
  }

  @WriteProtected()
  @Post('batch')
  @ApiOperation({ summary: 'Create multiple schools' })
  @ApiBody({ type: [CreateSchoolDto] })
  @ApiResponse({ status: 201, description: 'Schools created.' })
  createMany(@Body() createSchoolDtos: CreateSchoolDto[]) {
    return this.schoolsService.createMany(createSchoolDtos);
  }

  @Get()
  @ApiOperation({ summary: 'List schools' })
  @ApiQuery({ name: 'category', required: false, enum: Category, description: 'Filter schools by category' })
  @ApiResponse({ status: 200, description: 'Schools returned.' })
  findAll(
    @Query('category') category: string
  ) {
    return this.schoolsService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one school by id' })
  @ApiParam({ name: 'id', type: String, description: 'School id' })
  @ApiResponse({ status: 200, description: 'School returned.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schoolsService.findOne(id);
  }

  @WriteProtected()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a school' })
  @ApiParam({ name: 'id', type: Number, description: 'School id' })
  @ApiBody({ type: UpdateSchoolDto })
  @ApiResponse({ status: 200, description: 'School updated.' })
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(+id, updateSchoolDto);
  }

  @WriteProtected()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school' })
  @ApiParam({ name: 'id', type: Number, description: 'School id' })
  @ApiResponse({ status: 200, description: 'School deleted.' })
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(+id);
  }
}
