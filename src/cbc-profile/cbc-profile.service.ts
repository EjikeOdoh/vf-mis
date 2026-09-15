import { Injectable } from '@nestjs/common';
import { CreateCbcProfileDto } from './dto/create-cbc-profile.dto';
import { UpdateCbcProfileDto } from './dto/update-cbc-profile.dto';

@Injectable()
export class CbcProfileService {
  create(createCbcProfileDto: CreateCbcProfileDto) {
    return 'This action adds a new cbcProfile';
  }

  findAll() {
    return `This action returns all cbcProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cbcProfile`;
  }

  update(id: number, updateCbcProfileDto: UpdateCbcProfileDto) {
    return `This action updates a #${id} cbcProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} cbcProfile`;
  }
}
