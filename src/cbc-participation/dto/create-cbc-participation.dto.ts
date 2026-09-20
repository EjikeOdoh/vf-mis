import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Cohort } from "src/common/enum";

export class CreateCbcParticipationDto {
    @IsOptional()
    @IsString()
    studentId?: string;

    @IsOptional()
    @IsString()
    track?: string;

    @IsOptional()
    @IsEnum(Cohort)
    cohort?: Cohort;

    @IsNumber()
    year!: number;

}
