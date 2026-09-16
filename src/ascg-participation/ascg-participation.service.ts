import { Injectable } from '@nestjs/common';
import { CreateAscgParticipationDto } from './dto/create-ascg-participation.dto';
import { UpdateAscgParticipationDto } from './dto/update-ascg-participation.dto';

@Injectable()
export class AscgParticipationService {
  create(createAscgParticipationDto: CreateAscgParticipationDto) {
    return 'This action adds a new ascgParticipation';
  }

  findAll() {
    return `This action returns all ascgParticipation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ascgParticipation`;
  }

  update(id: number, updateAscgParticipationDto: UpdateAscgParticipationDto) {
    return `This action updates a #${id} ascgParticipation`;
  }

  remove(id: number) {
    return `This action removes a #${id} ascgParticipation`;
  }
}
