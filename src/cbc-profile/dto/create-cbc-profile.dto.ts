import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateCbcProfileDto {
    @IsOptional()
    @IsString()
    school?: string;

    @IsOptional()
    @IsString()
    priorTechEducation?: string;

    @IsOptional()
    @IsString()
    priorTechExperience?: string;

    @IsOptional()
    @IsString()
    track?: string;

    @IsOptional()
    @IsBoolean()
    completedProgram?: boolean;

    @IsOptional()
    @IsString()
    outcomeAt6Months?: string;

    @IsOptional()
    @IsString()
    outcomeAt12Months?: string;

    @IsOptional()
    @IsString()
    roleTitle?: string;

    @IsOptional()
    @IsString()
    company?: string;

    @IsOptional()
    @IsString()
    industry?: string;

    @IsOptional()
    @IsString()
    techEngagementLevel?: string;
}
