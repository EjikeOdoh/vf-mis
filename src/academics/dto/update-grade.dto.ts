import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeDto } from './create-academics-batch.dto';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {}
