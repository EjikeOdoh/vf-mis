import { Module } from '@nestjs/common';
import { AscgParticipationService } from './ascg-participation.service';
import { AscgParticipationController } from './ascg-participation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AscgParticipation } from './entities/ascg-participation.entity';
import { AscgParticipationListener } from './ascg-participation.listener';

@Module({
  imports:[TypeOrmModule.forFeature([AscgParticipation])],
  controllers: [AscgParticipationController],
  providers: [AscgParticipationService],
})
export class AscgParticipationModule {}
