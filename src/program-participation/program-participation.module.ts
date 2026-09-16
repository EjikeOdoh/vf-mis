import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramParticipationController } from './program-participation.controller';
import { ProgramParticipationService } from './program-participation.service';
import { ProgramParticipation } from './entities/program-participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramParticipation])],
  controllers: [ProgramParticipationController],
  providers: [ProgramParticipationService],
})
export class ProgramParticipationModule {}
