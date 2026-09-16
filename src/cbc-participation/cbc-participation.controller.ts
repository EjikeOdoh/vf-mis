import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CbcParticipationService } from './cbc-participation.service';
import { CreateCbcParticipationDto } from './dto/create-cbc-participation.dto';
import { UpdateCbcParticipationDto } from './dto/update-cbc-participation.dto';

@Controller('cbc-participation')
export class CbcParticipationController {
  constructor(private readonly cbcParticipationService: CbcParticipationService) {}

  @Post()
  create(@Body() createCbcParticipationDto: CreateCbcParticipationDto) {
    return this.cbcParticipationService.create(createCbcParticipationDto);
  }

  @Get()
  findAll() {
    return this.cbcParticipationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cbcParticipationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCbcParticipationDto: UpdateCbcParticipationDto) {
    return this.cbcParticipationService.update(+id, updateCbcParticipationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cbcParticipationService.remove(+id);
  }
}
