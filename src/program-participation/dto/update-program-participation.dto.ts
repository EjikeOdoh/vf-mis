import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramParticipationDto } from './create-program-participation.dto';

export class UpdateProgramParticipationDto extends PartialType(CreateProgramParticipationDto) {}
