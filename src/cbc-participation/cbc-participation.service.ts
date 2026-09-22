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
  ) { }

  async create(createCbcParticipationDto: CreateCbcParticipationDto) {
    const part = this.participation.create(createCbcParticipationDto as any);
    return await this.participation.save(part);
  }

  async findAll() {
    return await this.participation.find();
  }

  async findOne(id: number) {
    return `await this.participation.findOneByOrFail({ id })`;
  }

  async update(id: number, updateCbcParticipationDto: UpdateCbcParticipationDto) {
    await this.participation.update(id, updateCbcParticipationDto as any);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.participation.delete(id);
    return { success: true };
  }
}
