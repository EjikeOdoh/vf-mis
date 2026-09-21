import { Injectable } from '@nestjs/common';
import { CreateAscgProfileDto } from './dto/create-ascg-profile.dto';
import { UpdateAscgProfileDto } from './dto/update-ascg-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AscgProfile } from './entities/ascg-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AscgProfileService {

  constructor(
    @InjectRepository(AscgProfile) private readonly ascgProfileRepository: Repository<AscgProfile>
  ) { }
  async create(createAscgProfileDto: CreateAscgProfileDto) {
    const profile = this.ascgProfileRepository.create(createAscgProfileDto);
    return await this.ascgProfileRepository.save(profile);
  }

  async findAll() {
    return await this.ascgProfileRepository.find();
  }

  async findOne(id: string | number) {
    const idStr = String(id);
    return await this.ascgProfileRepository.findOneByOrFail({ id: idStr });
  }

  async update(id: string | number, updateAscgProfileDto: UpdateAscgProfileDto) {
    const idStr = String(id);
    await this.ascgProfileRepository.update(idStr, updateAscgProfileDto as any);
    return await this.findOne(id);
  }

  async remove(id: string | number) {
    const idStr = String(id);
    return await this.ascgProfileRepository.delete(idStr);
  }
}
