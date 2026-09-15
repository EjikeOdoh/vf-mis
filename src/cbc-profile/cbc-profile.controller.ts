import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CbcProfileService } from './cbc-profile.service';
import { CreateCbcProfileDto } from './dto/create-cbc-profile.dto';
import { UpdateCbcProfileDto } from './dto/update-cbc-profile.dto';

@Controller('cbc-profile')
export class CbcProfileController {
  constructor(private readonly cbcProfileService: CbcProfileService) {}

  @Post()
  create(@Body() createCbcProfileDto: CreateCbcProfileDto) {
    return this.cbcProfileService.create(createCbcProfileDto);
  }

  @Get()
  findAll() {
    return this.cbcProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cbcProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCbcProfileDto: UpdateCbcProfileDto) {
    return this.cbcProfileService.update(+id, updateCbcProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cbcProfileService.remove(+id);
  }
}
