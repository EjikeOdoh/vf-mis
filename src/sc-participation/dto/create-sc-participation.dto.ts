import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CampType } from "src/common/enum";

export class CreateScParticipationDto {
    @ApiPropertyOptional({ description: 'Student identifier.', example: 'student-001' })
    @IsOptional()
    @IsString()
    studentId?: string;

    @ApiPropertyOptional({ description: 'School name.', example: 'Green Valley School' })
    @IsOptional()
    @IsString()
    school?: string;

    @ApiPropertyOptional({ description: 'Camp type.', enum: CampType, example: CampType.SSC })
    @IsEnum(CampType)
    @IsOptional()
    type?: CampType;

    @ApiProperty({ description: 'Participation year.', example: 2024 })
    @IsNumber()
    year!: number;
}
