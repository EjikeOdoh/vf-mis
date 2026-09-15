import { PartialType } from '@nestjs/mapped-types';
import { CreateAscgProfileDto } from './create-ascg-profile.dto';

export class UpdateAscgProfileDto extends PartialType(CreateAscgProfileDto) {}
