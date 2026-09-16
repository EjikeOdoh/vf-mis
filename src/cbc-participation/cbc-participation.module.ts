import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CbcParticipationController } from './cbc-participation.controller';
import { CbcParticipationService } from './cbc-participation.service';
import { CbcParticipation } from './entities/cbc-participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CbcParticipation])],
  controllers: [CbcParticipationController],
  providers: [CbcParticipationService],
})
export class CbcParticipationModule {}
