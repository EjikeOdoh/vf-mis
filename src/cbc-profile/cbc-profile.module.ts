import { Module } from '@nestjs/common';
import { CbcProfileService } from './cbc-profile.service';
import { CbcProfileController } from './cbc-profile.controller';

@Module({
  controllers: [CbcProfileController],
  providers: [CbcProfileService],
})
export class CbcProfileModule {}
