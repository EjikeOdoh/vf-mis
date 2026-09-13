import { PartialType } from '@nestjs/mapped-types';
import { CreateCbcStudentDto } from './create-cbc-student.dto';

export class UpdateCbcStudentDto extends PartialType(CreateCbcStudentDto) {}
