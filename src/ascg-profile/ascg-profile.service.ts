import { Injectable } from '@nestjs/common';
import { CreateAscgProfileDto } from './dto/create-ascg-profile.dto';
import { UpdateAscgProfileDto } from './dto/update-ascg-profile.dto';

@Injectable()
export class AscgProfileService {
  create(createAscgProfileDto: CreateAscgProfileDto) {
    return 'This action adds a new ascgProfile';
  }

  findAll() {
    return `This action returns all ascgProfile`;
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
