import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProgramParticipationService } from './program-participation.service';
import { CreateProgramParticipationDto } from './dto/create-program-participation.dto';
import { UpdateProgramParticipationDto } from './dto/update-program-participation.dto';

@Controller('program-participation')
export class ProgramParticipationController {
  constructor(private readonly programParticipationService: ProgramParticipationService) {}

  @Post()
  create(@Body() createProgramParticipationDto: CreateProgramParticipationDto) {
    return this.programParticipationService.create(createProgramParticipationDto);
  }

  @Get()
  findAll(
    @Query('year') year?: string,
    @Query('programId') programId?: string,
  ) {
    return this.programParticipationService.findAll(year, programId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programParticipationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramParticipationDto: UpdateProgramParticipationDto) {
    return this.programParticipationService.update(+id, updateProgramParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programParticipationService.remove(+id);
  }
}
