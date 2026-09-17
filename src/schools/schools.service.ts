import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import { SchoolsFilter } from './schools.controller';

@Injectable()
export class SchoolsService {

  constructor(
    @InjectRepository(School) private readonly schoolRepo: Repository<School>
  ) { }

  async create(createSchoolDto: CreateSchoolDto) {
    const newSchool = this.schoolRepo.create(createSchoolDto);
    return await this.schoolRepo.save(newSchool);
  }

  async findAll(category: string) {
    if (category) {
      return await this.schoolRepo.findAndCount({ where: { category } })
    }

    return await this.schoolRepo.findAndCount();
  }


  async findOne(id: string) {
    const school = await this.schoolRepo.findOneBy({ id });

    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    return school;
  }


  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
