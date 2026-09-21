import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CbcProfileController } from './cbc-profile.controller';
import { CbcProfileService } from './cbc-profile.service';
import { CbcProfile } from './entities/cbc-profile.entity';
import { CbcProfileListener } from './cbc-profile.listener';

@Module({
  imports: [TypeOrmModule.forFeature([CbcProfile])],
  controllers: [CbcProfileController],
  providers: [CbcProfileService, CbcProfileListener],
})
export class CbcProfileModule {}
