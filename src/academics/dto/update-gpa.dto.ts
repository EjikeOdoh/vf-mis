import { PartialType } from '@nestjs/mapped-types';
import { CreateGpaDto } from './create-academics-batch.dto';

export class UpdateGpaDto extends PartialType(CreateGpaDto) {}
