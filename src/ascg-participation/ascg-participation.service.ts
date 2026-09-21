import { Injectable } from '@nestjs/common';
import { CreateAscgParticipationDto } from './dto/create-ascg-participation.dto';
import { UpdateAscgParticipationDto } from './dto/update-ascg-participation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AscgParticipation } from './entities/ascg-participation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AscgParticipationService {

  constructor(
    @InjectRepository(AscgParticipation) private readonly ascgParticipationRepository: Repository<AscgParticipation>
  ) { }

  async create(createAscgParticipationDto: CreateAscgParticipationDto) {
    const participation = this.ascgParticipationRepository.create(createAscgParticipationDto);
    return await this.ascgParticipationRepository.save(participation);
  }

  async findAll() {
    return await this.ascgParticipationRepository.find();
  }

  async findOne(id: number) {
    return await this.ascgParticipationRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateAscgParticipationDto: UpdateAscgParticipationDto) {
    await this.ascgParticipationRepository.update(id, updateAscgParticipationDto as any);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.ascgParticipationRepository.delete(id);
    return { success: true };
  }
}
