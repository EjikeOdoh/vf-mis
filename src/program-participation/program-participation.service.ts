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

  create(createProgramParticipationDto: CreateProgramParticipationDto) {
    return 'This action adds a new programParticipation';
  }

  async findAll() {
    return await this.participationRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} programParticipation`;
  }

  update(id: number, updateProgramParticipationDto: UpdateProgramParticipationDto) {
    return `This action updates a #${id} programParticipation`;
  }

  remove(id: number) {
    return `This action removes a #${id} programParticipation`;
  }
}
