import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CbcProfileService } from './cbc-profile.service';
import { CreateCbcProfileDto } from './dto/create-cbc-profile.dto';
import { UpdateCbcProfileDto } from './dto/update-cbc-profile.dto';

@ApiTags('CBC Profile')
@Controller('cbc-profile')
export class CbcProfileController {
  constructor(private readonly cbcProfileService: CbcProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create a CBC profile' })
  @ApiBody({ type: CreateCbcProfileDto })
  @ApiResponse({ status: 201, description: 'CBC profile created.' })
  create(@Body() createCbcProfileDto: CreateCbcProfileDto) {
    return this.cbcProfileService.create(createCbcProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all CBC profiles' })
  @ApiResponse({ status: 200, description: 'CBC profiles returned.' })
  findAll() {
    return this.cbcProfileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one CBC profile by id' })
  @ApiParam({ name: 'id', type: String, description: 'Profile id' })
  @ApiResponse({ status: 200, description: 'CBC profile returned.' })
  findOne(@Param('id') id: string) {
    return this.cbcProfileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a CBC profile' })
  @ApiParam({ name: 'id', type: String, description: 'Profile id' })
  @ApiBody({ type: UpdateCbcProfileDto })
  @ApiResponse({ status: 200, description: 'CBC profile updated.' })
  update(@Param('id') id: string, @Body() updateCbcProfileDto: UpdateCbcProfileDto) {
    return this.cbcProfileService.update(id, updateCbcProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a CBC profile' })
  @ApiParam({ name: 'id', type: String, description: 'Profile id' })
  @ApiResponse({ status: 200, description: 'CBC profile deleted.' })
  remove(@Param('id') id: string) {
    return this.cbcProfileService.remove(id);
  }
}
