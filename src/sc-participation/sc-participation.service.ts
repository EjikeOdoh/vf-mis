import { Injectable } from '@nestjs/common';
import { CreateScParticipationDto } from './dto/create-sc-participation.dto';
import { UpdateScParticipationDto } from './dto/update-sc-participation.dto';

@Injectable()
export class ScParticipationService {
  create(createScParticipationDto: CreateScParticipationDto) {
    return 'This action adds a new scParticipation';
  }

  findAll() {
    return `This action returns all scParticipation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scParticipation`;
  }

  update(id: number, updateScParticipationDto: UpdateScParticipationDto) {
    return `This action updates a #${id} scParticipation`;
  }

  remove(id: number) {
    return `This action removes a #${id} scParticipation`;
  }
}
