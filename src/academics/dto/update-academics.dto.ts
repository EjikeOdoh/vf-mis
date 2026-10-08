import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicsDto } from './create-academics-batch.dto';

export class UpdateAcademicsDto extends PartialType(CreateAcademicsDto) {}
