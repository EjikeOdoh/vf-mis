import { PartialType } from '@nestjs/mapped-types';
import { CreateCbcParticipationDto } from './create-cbc-participation.dto';

export class UpdateCbcParticipationDto extends PartialType(CreateCbcParticipationDto) {}
