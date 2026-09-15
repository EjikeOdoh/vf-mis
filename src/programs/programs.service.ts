import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramsService {

  constructor(
    @InjectRepository(Program) private readonly programRepository: Repository<Program>
  ) { }

  async create(createProgramDto: CreateProgramDto) {
    const program = this.programRepository.create(createProgramDto);
    program.id = createProgramDto.id;
    return await this.programRepository.save(program);
  }

  async findAll() {
    return await this.programRepository.find();
  }

  async findOne(id: string) {
    return await this.programRepository.findOneBy({ id });
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    await this.programRepository.update(id, updateProgramDto);
    return await this.programRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.programRepository.delete(id);
    return { success: true }
  }
}
