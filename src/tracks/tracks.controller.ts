import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WriteProtected } from 'src/auth/decorators/write-protected.decorator';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @WriteProtected()
  @Post()
  @ApiOperation({ summary: 'Create a track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({ status: 201, description: 'Track created.' })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @WriteProtected()
  @Post('batch')
  @ApiOperation({ summary: 'Create multiple tracks' })
  @ApiBody({ type: [CreateTrackDto] })
  @ApiResponse({ status: 201, description: 'Tracks created.' })
  createBatch(@Body() createTrackDtos: CreateTrackDto[]) {
    return this.tracksService.createMany(createTrackDtos);
  }

  @Get()
  @ApiOperation({ summary: 'List all tracks' })
  @ApiResponse({ status: 200, description: 'Tracks returned.' })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one track by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Track id' })
  @ApiResponse({ status: 200, description: 'Track returned.' })
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(+id);
  }

  @WriteProtected()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a track' })
  @ApiParam({ name: 'id', type: Number, description: 'Track id' })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({ status: 200, description: 'Track updated.' })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(+id, updateTrackDto);
  }

  @WriteProtected()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track' })
  @ApiParam({ name: 'id', type: Number, description: 'Track id' })
  @ApiResponse({ status: 200, description: 'Track deleted.' })
  remove(@Param('id') id: string) {
    return this.tracksService.remove(+id);
  }
}
