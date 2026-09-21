import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCbcProfileDto } from './dto/create-cbc-profile.dto';
import { UpdateCbcProfileDto } from './dto/update-cbc-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CbcProfile } from './entities/cbc-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CbcProfileService {

    constructor(
      @InjectRepository(CbcProfile) private readonly cbcProfileRepository: Repository<CbcProfile>
    ) { }

  async create(createCbcProfileDto: CreateCbcProfileDto) {
    const profile = this.cbcProfileRepository.create(createCbcProfileDto as any);
    return await this.cbcProfileRepository.save(profile);
  
  }

 async findAll() {
    return await this.cbcProfileRepository.find();
  }

  async findOne(id: string) {
    return await this.cbcProfileRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateCbcProfileDto: UpdateCbcProfileDto) {
    await this.cbcProfileRepository.update(id, updateCbcProfileDto as any);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.cbcProfileRepository.delete(id);
    return { success: true };
  }
}
