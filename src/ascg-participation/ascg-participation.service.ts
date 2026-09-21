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
  ) {

  }

  create(createAscgParticipationDto: CreateAscgParticipationDto) {
    return 'This action adds a new ascgParticipation';
  }

  async findAll() {
    return await this.ascgParticipationRepository.find();
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
