import { Module } from '@nestjs/common';
import { ScParticipationService } from './sc-participation.service';
import { ScParticipationController } from './sc-participation.controller';

@Module({
  controllers: [ScParticipationController],
  providers: [ScParticipationService],
})
export class ScParticipationModule {}
