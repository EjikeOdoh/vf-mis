import { PartialType } from '@nestjs/mapped-types';
import { CreateAscgParticipationDto } from './create-ascg-participation.dto';

export class UpdateAscgParticipationDto extends PartialType(CreateAscgParticipationDto) {}
