import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScParticipationController } from './sc-participation.controller';
import { ScParticipationService } from './sc-participation.service';
import { ScParticipation } from './entities/sc-participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScParticipation])],
  controllers: [ScParticipationController],
  providers: [ScParticipationService],
})
export class ScParticipationModule {}
