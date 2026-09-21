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
  ) {}

  create(createAscgProfileDto: CreateAscgProfileDto) {
    return 'This action adds a new ascgProfile';
  }

  async findAll() {
    return await this.ascgProfileRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ascgProfile`;
  }

  update(id: number, updateAscgProfileDto: UpdateAscgProfileDto) {
    return `This action updates a #${id} ascgProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} ascgProfile`;
  }
}
