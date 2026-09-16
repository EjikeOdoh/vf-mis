import { Injectable } from '@nestjs/common';
import { CreateProgramParticipationDto } from './dto/create-program-participation.dto';
import { UpdateProgramParticipationDto } from './dto/update-program-participation.dto';

@Injectable()
export class ProgramParticipationService {
  create(createProgramParticipationDto: CreateProgramParticipationDto) {
    return 'This action adds a new programParticipation';
  }

  findAll() {
    return `This action returns all programParticipation`;
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
