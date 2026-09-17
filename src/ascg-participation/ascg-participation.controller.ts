import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AscgParticipationService } from './ascg-participation.service';
import { CreateAscgParticipationDto } from './dto/create-ascg-participation.dto';
import { UpdateAscgParticipationDto } from './dto/update-ascg-participation.dto';

@Controller('ascg-participation')
export class AscgParticipationController {
  constructor(private readonly ascgParticipationService: AscgParticipationService) {}

  @Post()
  create(@Body() createAscgParticipationDto: CreateAscgParticipationDto) {
    return this.ascgParticipationService.create(createAscgParticipationDto);
  }

  @Get()
  findAll() {
    return this.ascgParticipationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ascgParticipationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAscgParticipationDto: UpdateAscgParticipationDto) {
    return this.ascgParticipationService.update(+id, updateAscgParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ascgParticipationService.remove(+id);
  }
}
