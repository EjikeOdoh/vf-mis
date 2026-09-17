import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {

  constructor(
    @InjectRepository(Track) private readonly trackRepository: Repository<Track>
  ) { }

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
  }

  async findAll() {
    return await this.trackRepository.findAndCount();
  }

  async findOne(id: string) {
    return await this.trackRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.trackRepository.update(id, updateTrackDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.trackRepository.delete(id);
    return { success: true };
  }
}
