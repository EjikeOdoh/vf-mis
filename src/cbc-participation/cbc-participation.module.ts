import { Module } from '@nestjs/common';
import { CbcParticipationService } from './cbc-participation.service';
import { CbcParticipationController } from './cbc-participation.controller';

@Module({
  controllers: [CbcParticipationController],
  providers: [CbcParticipationService],
})
export class CbcParticipationModule {}
