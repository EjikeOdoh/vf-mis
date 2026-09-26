import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { AscgParticipation } from 'src/ascg-participation/entities/ascg-participation.entity';
import { CbcParticipation } from 'src/cbc-participation/entities/cbc-participation.entity';
import { ProgramParticipation } from 'src/program-participation/entities/program-participation.entity';
import { ScParticipation } from 'src/sc-participation/entities/sc-participation.entity';
import { AscgProfile } from 'src/ascg-profile/entities/ascg-profile.entity';
import { CbcProfile } from 'src/cbc-profile/entities/cbc-profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student, AscgParticipation, CbcParticipation, ProgramParticipation, ScParticipation, AscgProfile, CbcProfile])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
