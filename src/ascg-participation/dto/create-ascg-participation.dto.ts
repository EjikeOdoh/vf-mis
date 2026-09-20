import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAscgParticipationDto {
    @IsOptional()
    @IsString()
    studentId?: string

    @IsString()
    schoolId!: string;

    @IsNumber()
    year!: number;
}
