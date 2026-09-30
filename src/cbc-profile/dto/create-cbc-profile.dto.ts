import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Cohort } from 'src/common/enum';

export class CreateCbcProfileDto {
    @ApiPropertyOptional({ description: 'School name.', example: 'Green Valley School' })
    @IsOptional()
    @IsString()
    school?: string;

    @ApiPropertyOptional({ description: 'Prior technical education background.', example: 'BOOTCAMP' })
    @IsOptional()
    @IsString()
    priorTechEducation?: string;

    @ApiPropertyOptional({ description: 'Prior technical experience level.', example: '1_to_2_years' })
    @IsOptional()
    @IsString()
    priorTechExperience?: string;

    @ApiPropertyOptional({ description: 'Focus track.', example: 'Backend Development' })
    @IsOptional()
    @IsString()
    track?: string;

    @ApiPropertyOptional({ description: 'Whether the program was completed.', example: true })
    @IsOptional()
    @IsBoolean()
    completedProgram?: boolean;

    @ApiPropertyOptional({ description: 'Outcome after 6 months.', example: 'Employed' })
    @IsOptional()
    @IsString()
    outcomeAt6Months?: string;

    @ApiPropertyOptional({ description: 'Outcome after 12 months.', example: 'Promoted' })
    @IsOptional()
    @IsString()
    outcomeAt12Months?: string;

    @ApiPropertyOptional({ description: 'Role title.', example: 'Junior Developer' })
    @IsOptional()
    @IsString()
    roleTitle?: string;

    @ApiPropertyOptional({ description: 'Company name.', example: 'TechNova' })
    @IsOptional()
    @IsString()
    company?: string;

    @ApiPropertyOptional({ description: 'Industry sector.', example: 'Finance' })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiPropertyOptional({ description: 'Technology engagement level.', example: 'fully_engaged' })
    @IsOptional()
    @IsString()
    techEngagementLevel?: string;

    @ApiPropertyOptional({ description: 'Cohort value.', enum: Cohort, example: Cohort.ONE })
    @IsOptional()
    @IsEnum(Cohort)
    cohort?: Cohort
}
