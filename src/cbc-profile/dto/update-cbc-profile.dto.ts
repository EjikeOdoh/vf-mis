import { PartialType } from '@nestjs/mapped-types';
import { CreateCbcProfileDto } from './create-cbc-profile.dto';

export class UpdateCbcProfileDto extends PartialType(CreateCbcProfileDto) {}
