import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { ProgramParticipation } from 'src/program-participation/entities/program-participation.entity';
import { School } from 'src/schools/entities/school.entity';
import { AscgParticipation } from 'src/ascg-participation/entities/ascg-participation.entity';
import { CbcParticipation } from 'src/cbc-participation/entities/cbc-participation.entity';
import { ScParticipation } from 'src/sc-participation/entities/sc-participation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Student,
      ProgramParticipation,
      School,
      AscgParticipation,
      CbcParticipation,
      ScParticipation
    ])
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
