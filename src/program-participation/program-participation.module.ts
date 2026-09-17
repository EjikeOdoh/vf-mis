import { Module } from '@nestjs/common';
import { ProgramParticipationService } from './program-participation.service';
import { ProgramParticipationController } from './program-participation.controller';

@Module({
  controllers: [ProgramParticipationController],
  providers: [ProgramParticipationService],
})
export class ProgramParticipationModule {}
