import { Injectable } from '@nestjs/common';
import { CreateCbcParticipationDto } from './dto/create-cbc-participation.dto';
import { UpdateCbcParticipationDto } from './dto/update-cbc-participation.dto';

@Injectable()
export class CbcParticipationService {
  create(createCbcParticipationDto: CreateCbcParticipationDto) {
    return 'This action adds a new cbcParticipation';
  }

  findAll() {
    return `This action returns all cbcParticipation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cbcParticipation`;
  }

  update(id: number, updateCbcParticipationDto: UpdateCbcParticipationDto) {
    return `This action updates a #${id} cbcParticipation`;
  }

  remove(id: number) {
    return `This action removes a #${id} cbcParticipation`;
  }
}
