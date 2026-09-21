import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AscgProfileController } from './ascg-profile.controller';
import { AscgProfileService } from './ascg-profile.service';
import { AscgProfile } from './entities/ascg-profile.entity';
import { AscgProfileListener } from './ascg-profile.listener';

@Module({
  imports: [TypeOrmModule.forFeature([AscgProfile])],
  controllers: [AscgProfileController],
  providers: [AscgProfileService, AscgProfileListener],
})
export class AscgProfileModule {}
