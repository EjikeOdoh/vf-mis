import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramParticipationController } from './program-participation.controller';
import { ProgramParticipationService } from './program-participation.service';
import { ProgramParticipation } from './entities/program-participation.entity';
import { ProgramParticipationListener } from './program-participation.listener';
import { AscgParticipation } from 'src/ascg-participation/entities/ascg-participation.entity';
import { CbcParticipation } from 'src/cbc-participation/entities/cbc-participation.entity';
import { ScParticipation } from 'src/sc-participation/entities/sc-participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramParticipation, AscgParticipation, CbcParticipation, ScParticipation])],
  controllers: [ProgramParticipationController],
  providers: [ProgramParticipationService, ProgramParticipationListener],
})
export class ProgramParticipationModule {}
