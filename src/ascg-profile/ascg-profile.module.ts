import { Module } from '@nestjs/common';
import { AscgProfileService } from './ascg-profile.service';
import { AscgProfileController } from './ascg-profile.controller';

@Module({
  controllers: [AscgProfileController],
  providers: [AscgProfileService],
})
export class AscgProfileModule {}
