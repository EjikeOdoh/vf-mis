import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WriteProtected } from 'src/auth/decorators/write-protected.decorator';
import { ScParticipationService } from './sc-participation.service';
import { CreateScParticipationDto } from './dto/create-sc-participation.dto';
import { UpdateScParticipationDto } from './dto/update-sc-participation.dto';

@ApiTags('SC Participation')
@Controller('sc-participation')
export class ScParticipationController {
  constructor(private readonly scParticipationService: ScParticipationService) {}

  @WriteProtected()
  @Post()
  @ApiOperation({ summary: 'Create SC participation record' })
  @ApiBody({ type: CreateScParticipationDto })
  @ApiResponse({ status: 201, description: 'Participation record created.' })
  create(@Body() createScParticipationDto: CreateScParticipationDto) {
    return this.scParticipationService.create(createScParticipationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all SC participation records' })
  @ApiResponse({ status: 200, description: 'Participation records returned.' })
  findAll() {
    return this.scParticipationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one SC participation record by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiResponse({ status: 200, description: 'Participation record returned.' })
  findOne(@Param('id') id: string) {
    return this.scParticipationService.findOne(+id);
  }

  @WriteProtected()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an SC participation record' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiBody({ type: UpdateScParticipationDto })
  @ApiResponse({ status: 200, description: 'Participation record updated.' })
  update(@Param('id') id: string, @Body() updateScParticipationDto: UpdateScParticipationDto) {
    return this.scParticipationService.update(+id, updateScParticipationDto);
  }

  @WriteProtected()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an SC participation record' })
  @ApiParam({ name: 'id', type: Number, description: 'Participation record id' })
  @ApiResponse({ status: 200, description: 'Participation record deleted.' })
  remove(@Param('id') id: string) {
    return this.scParticipationService.remove(+id);
  }
}
