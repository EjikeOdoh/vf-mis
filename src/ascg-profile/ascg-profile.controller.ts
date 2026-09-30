import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AscgProfileService } from './ascg-profile.service';
import { CreateAscgProfileDto } from './dto/create-ascg-profile.dto';
import { UpdateAscgProfileDto } from './dto/update-ascg-profile.dto';

@ApiTags('ASCG Profile')
@Controller('ascg-profile')
export class AscgProfileController {
  constructor(private readonly ascgProfileService: AscgProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create an ASCG profile' })
  @ApiBody({ type: CreateAscgProfileDto })
  @ApiResponse({ status: 201, description: 'ASCG profile created.' })
  create(@Body() createAscgProfileDto: CreateAscgProfileDto) {
    return this.ascgProfileService.create(createAscgProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all ASCG profiles' })
  @ApiResponse({ status: 200, description: 'ASCG profiles returned.' })
  findAll() {
    return this.ascgProfileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one ASCG profile by id' })
  @ApiParam({ name: 'id', type: String, description: 'Profile id' })
  @ApiResponse({ status: 200, description: 'ASCG profile returned.' })
  findOne(@Param('id') id: string) {
    return this.ascgProfileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ASCG profile' })
  @ApiParam({ name: 'id', type: String, description: 'Profile id' })
  @ApiBody({ type: UpdateAscgProfileDto })
  @ApiResponse({ status: 200, description: 'ASCG profile updated.' })
  update(@Param('id') id: string, @Body() updateAscgProfileDto: UpdateAscgProfileDto) {
    return this.ascgProfileService.update(id, updateAscgProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ASCG profile' })
  @ApiParam({ name: 'id', type: String, description: 'Profile id' })
  @ApiResponse({ status: 200, description: 'ASCG profile deleted.' })
  remove(@Param('id') id: string) {
    return this.ascgProfileService.remove(id);
  }
}
