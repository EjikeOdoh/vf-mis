import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Cohort } from "src/common/enum";

export class CreateCbcParticipationDto {
    @ApiPropertyOptional({ description: 'Student identifier.', example: 'student-001' })
    @IsOptional()
    @IsString()
    studentId?: string;

    @ApiPropertyOptional({ description: 'Track name.', example: 'Web Development' })
    @IsOptional()
    @IsString()
    track?: string;

    @ApiPropertyOptional({ description: 'Track identifier.', example: 'track-001' })
    @IsOptional()
    @IsString()
    trackId?: string;

    @ApiPropertyOptional({ description: 'Cohort value.', enum: Cohort, example: Cohort.ONE })
    @IsOptional()
    @IsEnum(Cohort)
    cohort?: Cohort;

    @ApiProperty({ description: 'Participation year.', example: 2024 })
    @IsNumber()
    year!: number;

}
