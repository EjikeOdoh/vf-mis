import { PartialType } from '@nestjs/mapped-types';
import { CreatePerformanceDto } from './create-academics-batch.dto';

export class UpdatePerformanceDto extends PartialType(CreatePerformanceDto) {}
