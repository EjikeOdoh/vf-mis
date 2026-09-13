import { Module } from '@nestjs/common';
import { CbcStudentsService } from './cbc-students.service';
import { CbcStudentsController } from './cbc-students.controller';

@Module({
  controllers: [CbcStudentsController],
  providers: [CbcStudentsService],
})
export class CbcStudentsModule {}
