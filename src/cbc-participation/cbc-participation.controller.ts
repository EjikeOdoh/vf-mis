import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CbcParticipationService } from './cbc-participation.service';
import { CreateCbcParticipationDto } from './dto/create-cbc-participation.dto';
import { UpdateCbcParticipationDto } from './dto/update-cbc-participation.dto';

@ApiTags('CBC Participation')
@Controller('cbc-participation')
export class CbcParticipationController {
  constructor(private readonly cbcParticipationService: CbcParticipationService) {}

  @Post()
  @ApiOperation({ summary: 'Create CBC participation record' })
  @ApiBody({ type: CreateCbcParticipationDto })
  @ApiResponse({ status: 201, description: 'Participation record created.' })
  create(@Body() createCbcParticipationDto: CreateCbcParticipationDto) {
    return this.cbcParticipationService.create(createCbcParticipationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all CBC participation records' })
  @ApiResponse({ status: 200, description: 'Participation records returned.' })
  findAll() {
    return this.cbcParticipationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one CBC participation record by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiResponse({ status: 200, description: 'Participation record returned.' })
  findOne(@Param('id') id: string) {
    return this.cbcParticipationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a CBC participation record' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiBody({ type: UpdateCbcParticipationDto })
  @ApiResponse({ status: 200, description: 'Participation record updated.' })
  update(@Param('id') id: string, @Body() updateCbcParticipationDto: UpdateCbcParticipationDto) {
    return this.cbcParticipationService.update(+id, updateCbcParticipationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a CBC participation record' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiResponse({ status: 200, description: 'Participation record deleted.' })
  remove(@Param('id') id: string) {
    return this.cbcParticipationService.remove(+id);
  }
}
