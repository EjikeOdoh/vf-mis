import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CampType } from "src/common/enum";

export class CreateScParticipationDto {
    @IsOptional()
    @IsString()
    studentId?: string;

    @IsOptional()
    @IsString()
    school?: string;

    @IsEnum(CampType)
    @IsOptional()
    type?: CampType;

    @IsNumber()
    year!: number;
}
