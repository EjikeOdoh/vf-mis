import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AscgProfileService } from './ascg-profile.service';
import { CreateAscgProfileDto } from './dto/create-ascg-profile.dto';
import { UpdateAscgProfileDto } from './dto/update-ascg-profile.dto';

@Controller('ascg-profile')
export class AscgProfileController {
  constructor(private readonly ascgProfileService: AscgProfileService) {}

  @Post()
  create(@Body() createAscgProfileDto: CreateAscgProfileDto) {
    return this.ascgProfileService.create(createAscgProfileDto);
  }

  @Get()
  findAll() {
    return this.ascgProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ascgProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAscgProfileDto: UpdateAscgProfileDto) {
    return this.ascgProfileService.update(id, updateAscgProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ascgProfileService.remove(id);
  }
}
