import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScParticipationService } from './sc-participation.service';
import { CreateScParticipationDto } from './dto/create-sc-participation.dto';
import { UpdateScParticipationDto } from './dto/update-sc-participation.dto';

@Controller('sc-participation')
export class ScParticipationController {
  constructor(private readonly scParticipationService: ScParticipationService) {}

  @Post()
  create(@Body() createScParticipationDto: CreateScParticipationDto) {
    return this.scParticipationService.create(createScParticipationDto);
  }

  @Get()
  findAll() {
    return this.scParticipationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scParticipationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScParticipationDto: UpdateScParticipationDto) {
    return this.scParticipationService.update(+id, updateScParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scParticipationService.remove(+id);
  }
}
