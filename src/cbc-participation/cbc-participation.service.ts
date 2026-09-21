import { Injectable } from '@nestjs/common';
import { CreateCbcParticipationDto } from './dto/create-cbc-participation.dto';
import { UpdateCbcParticipationDto } from './dto/update-cbc-participation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CbcParticipation } from './entities/cbc-participation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CbcParticipationService {

  constructor(
    @InjectRepository(CbcParticipation) private readonly participation: Repository<CbcParticipation>
  ){}

  create(createCbcParticipationDto: CreateCbcParticipationDto) {
    return 'This action adds a new cbcParticipation';
  }

  async findAll() {
    return await this.participation.find();
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
