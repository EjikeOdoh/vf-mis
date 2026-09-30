import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a program' })
  @ApiBody({ type: CreateProgramDto })
  @ApiResponse({ status: 201, description: 'Program created.' })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all programs' })
  @ApiResponse({ status: 200, description: 'Programs returned.' })
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one program by id' })
  @ApiParam({ name: 'id', type: String, description: 'Program id' })
  @ApiResponse({ status: 200, description: 'Program returned.' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a program' })
  @ApiParam({ name: 'id', type: String, description: 'Program id' })
  @ApiBody({ type: UpdateProgramDto })
  @ApiResponse({ status: 200, description: 'Program updated.' })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a program' })
  @ApiParam({ name: 'id', type: String, description: 'Program id' })
  @ApiResponse({ status: 200, description: 'Program deleted.' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}
