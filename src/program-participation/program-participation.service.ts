import { Injectable } from '@nestjs/common';
import { CreateProgramParticipationDto } from './dto/create-program-participation.dto';
import { UpdateProgramParticipationDto } from './dto/update-program-participation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramParticipation } from './entities/program-participation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramParticipationService {

  constructor(
    @InjectRepository(ProgramParticipation) private readonly participationRepository: Repository<ProgramParticipation>
  ) { }

  async create(createProgramParticipationDto: CreateProgramParticipationDto) {
    const participation = this.participationRepository.create(createProgramParticipationDto);
    return await this.participationRepository.save(participation);
  }

  async findAll(year?: string | number, programId?: string) {
    const filters: Record<string, string | number> = {};

    if (year !== undefined && year !== null && year !== '') {
      filters.year = Number(year);
    }

    if (programId !== undefined && programId !== null && programId !== '') {
      filters.programId = programId;
    }

    return await this.participationRepository.findAndCount({
      where: Object.keys(filters).length > 0 ? filters : undefined,
    });
  }

  async findOne(id: number) {
    return await this.participationRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateProgramParticipationDto: UpdateProgramParticipationDto) {
    await this.participationRepository.update(id, updateProgramParticipationDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.participationRepository.delete(id);
    return { success: true };
  }
}
