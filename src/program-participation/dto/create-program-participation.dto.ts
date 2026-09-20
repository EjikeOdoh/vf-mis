import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProgramParticipationDto {

    @IsOptional()
    @IsString()
    studentId?: string;

    @IsString()
    programId?: string;

    @IsNumber()
    year!: number;

}
