import { PartialType } from '@nestjs/mapped-types';
import { CreateScParticipationDto } from './create-sc-participation.dto';

export class UpdateScParticipationDto extends PartialType(CreateScParticipationDto) {}
