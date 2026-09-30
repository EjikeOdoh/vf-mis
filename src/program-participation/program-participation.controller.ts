import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgramParticipationService } from './program-participation.service';
import { CreateProgramParticipationDto } from './dto/create-program-participation.dto';
import { UpdateProgramParticipationDto } from './dto/update-program-participation.dto';

@ApiTags('Program Participation')
@Controller('program-participation')
export class ProgramParticipationController {
  constructor(private readonly programParticipationService: ProgramParticipationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a program participation record' })
  @ApiBody({ type: CreateProgramParticipationDto })
  @ApiResponse({ status: 201, description: 'Participation record created.' })
  create(@Body() createProgramParticipationDto: CreateProgramParticipationDto) {
    return this.programParticipationService.create(createProgramParticipationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List program participation records' })
  @ApiQuery({ name: 'year', required: false, type: String, description: 'Filter by year' })
  @ApiQuery({ name: 'programId', required: false, type: String, description: 'Filter by program id' })
  @ApiResponse({ status: 200, description: 'Participation records returned.' })
  findAll(
    @Query('year') year?: string,
    @Query('programId') programId?: string,
  ) {
    return this.programParticipationService.findAll(year, programId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one program participation record by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiResponse({ status: 200, description: 'Participation record returned.' })
  findOne(@Param('id') id: string) {
    return this.programParticipationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a program participation record' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiBody({ type: UpdateProgramParticipationDto })
  @ApiResponse({ status: 200, description: 'Participation record updated.' })
  update(@Param('id') id: string, @Body() updateProgramParticipationDto: UpdateProgramParticipationDto) {
    return this.programParticipationService.update(+id, updateProgramParticipationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a program participation record' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiResponse({ status: 200, description: 'Participation record deleted.' })
  remove(@Param('id') id: string) {
    return this.programParticipationService.remove(+id);
  }
}
