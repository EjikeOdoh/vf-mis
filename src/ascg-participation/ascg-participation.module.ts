import { Module } from '@nestjs/common';
import { AscgParticipationService } from './ascg-participation.service';
import { AscgParticipationController } from './ascg-participation.controller';

@Module({
  controllers: [AscgParticipationController],
  providers: [AscgParticipationService],
})
export class AscgParticipationModule {}
