import { Injectable } from '@nestjs/common';
import { CreateScParticipationDto } from './dto/create-sc-participation.dto';
import { UpdateScParticipationDto } from './dto/update-sc-participation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScParticipation } from './entities/sc-participation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScParticipationService {
  constructor(
    @InjectRepository(ScParticipation) private readonly scParticipationRepository: Repository<ScParticipation>  
  ) { }

  async create(createScParticipationDto: CreateScParticipationDto) {
    const participation = this.scParticipationRepository.create(createScParticipationDto);
    return await this.scParticipationRepository.save(participation);
  }

  async findAll() {
    return await this.scParticipationRepository.find();
  }

  async findOne(id: number) {
    return await this.scParticipationRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateScParticipationDto: UpdateScParticipationDto) {
    await this.scParticipationRepository.update(id, updateScParticipationDto as any);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.scParticipationRepository.delete(id);
    return { success: true };
  }
}
