import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AcademicsService } from './academics.service';
import {
  CreateAcademicsBatchDto,
  CreateAcademicsDto,
  CreateGpaDto,
  CreateGradeDto,
  CreatePerformanceDto,
} from './dto/create-academics-batch.dto';
import { UpdateAcademicsDto } from './dto/update-academics.dto';
import { UpdateGpaDto } from './dto/update-gpa.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@ApiTags('Academics')
@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  @Post('batch')
  @ApiOperation({ summary: 'Create a batch of academic records' })
  @ApiBody({ type: CreateAcademicsBatchDto })
  @ApiResponse({ status: 201, description: 'Academic records created.' })
  createBatch(@Body() createAcademicsBatchDto: CreateAcademicsBatchDto) {
    return this.academicsService.createBatch(createAcademicsBatchDto);
  }

  @Post('record')
  @ApiOperation({ summary: 'Create a single academics record' })
  @ApiBody({ type: CreateAcademicsDto })
  @ApiResponse({ status: 201, description: 'Academics record created.' })
  createAcademics(@Body() createAcademicsDto: CreateAcademicsDto) {
    return this.academicsService.createAcademics(createAcademicsDto);
  }

  @Patch('record/:id')
  @ApiOperation({ summary: 'Update an academics record' })
  @ApiParam({ name: 'id', type: Number, description: 'Academics record id' })
  @ApiBody({ type: UpdateAcademicsDto })
  @ApiResponse({ status: 200, description: 'Academics record updated.' })
  updateAcademics(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAcademicsDto: UpdateAcademicsDto,
  ) {
    return this.academicsService.editAcademics(id, updateAcademicsDto as any);
  }

  @Delete('record/:id')
  @ApiOperation({ summary: 'Delete an academics record' })
  @ApiParam({ name: 'id', type: Number, description: 'Academics record id' })
  @ApiResponse({ status: 200, description: 'Academics record deleted.' })
  deleteAcademics(@Param('id', ParseIntPipe) id: number) {
    return this.academicsService.deleteAcademics(id);
  }

  @Post('grade')
  @ApiOperation({ summary: 'Create a grade record' })
  @ApiBody({ type: CreateGradeDto })
  @ApiResponse({ status: 201, description: 'Grade record created.' })
  createGrade(@Body() createGradeDto: CreateGradeDto) {
    return this.academicsService.createGrade(createGradeDto);
  }

  @Patch('grade/:id')
  @ApiOperation({ summary: 'Update a grade record' })
  @ApiParam({ name: 'id', type: Number, description: 'Grade record id' })
  @ApiBody({ type: UpdateGradeDto })
  @ApiResponse({ status: 200, description: 'Grade record updated.' })
  updateGrade(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return this.academicsService.editGrade(id, updateGradeDto);
  }

  @Delete('grade/:id')
  @ApiOperation({ summary: 'Delete a grade record' })
  @ApiParam({ name: 'id', type: Number, description: 'Grade record id' })
  @ApiResponse({ status: 200, description: 'Grade record deleted.' })
  deleteGrade(@Param('id', ParseIntPipe) id: number) {
    return this.academicsService.deleteGrade(id);
  }

  @Post('performance')
  @ApiOperation({ summary: 'Create a performance record' })
  @ApiBody({ type: CreatePerformanceDto })
  @ApiResponse({ status: 201, description: 'Performance record created.' })
  createPerformance(@Body() createPerformanceDto: CreatePerformanceDto) {
    return this.academicsService.createPerformance(createPerformanceDto);
  }

  @Patch('performance/:id')
  @ApiOperation({ summary: 'Update a performance record' })
  @ApiParam({ name: 'id', type: Number, description: 'Performance record id' })
  @ApiBody({ type: UpdatePerformanceDto })
  @ApiResponse({ status: 200, description: 'Performance record updated.' })
  updatePerformance(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerformanceDto: UpdatePerformanceDto,
  ) {
    return this.academicsService.editPerformance(id, updatePerformanceDto);
  }

  @Delete('performance/:id')
  @ApiOperation({ summary: 'Delete a performance record' })
  @ApiParam({ name: 'id', type: Number, description: 'Performance record id' })
  @ApiResponse({ status: 200, description: 'Performance record deleted.' })
  deletePerformance(@Param('id', ParseIntPipe) id: number) {
    return this.academicsService.delelePerformance(id);
  }

  @Post('gpa')
  @ApiOperation({ summary: 'Create a GPA record' })
  @ApiBody({ type: CreateGpaDto })
  @ApiResponse({ status: 201, description: 'GPA record created.' })
  createGpa(@Body() createGpaDto: CreateGpaDto) {
    return this.academicsService.createGPA(createGpaDto);
  }

  @Patch('gpa/:id')
  @ApiOperation({ summary: 'Update a GPA record' })
  @ApiParam({ name: 'id', type: Number, description: 'GPA record id' })
  @ApiBody({ type: UpdateGpaDto })
  @ApiResponse({ status: 200, description: 'GPA record updated.' })
  updateGpa(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGpaDto: UpdateGpaDto,
  ) {
    return this.academicsService.editGPA(id, updateGpaDto as any);
  }

  @Delete('gpa/:id')
  @ApiOperation({ summary: 'Delete a GPA record' })
  @ApiParam({ name: 'id', type: Number, description: 'GPA record id' })
  @ApiResponse({ status: 200, description: 'GPA record deleted.' })
  deleteGpa(@Param('id', ParseIntPipe) id: number) {
    return this.academicsService.deleteGPA(id);
  }

  @Get('by-year')
  @ApiOperation({ summary: 'Fetch academic records by year' })
  @ApiParam({ name: 'year', type: Number, description: 'Academic year' })
  @ApiResponse({ status: 200, description: 'Academic data returned.' })
  findByYear(@Query('year', ParseIntPipe) year: number) {
    return this.academicsService.findByYear(year);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Fetch academic summary by year' })
  @ApiParam({ name: 'year', type: Number, description: 'Academic year' })
  @ApiResponse({ status: 200, description: 'Academic summary returned.' })
  getAcademicSummary(@Query('year', ParseIntPipe) year: number) {
    return this.academicsService.findByYear(year);
  }
}
