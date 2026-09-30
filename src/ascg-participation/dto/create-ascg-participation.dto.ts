import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAscgParticipationDto {
    @ApiPropertyOptional({ description: 'Student identifier.', example: 'student-001' })
    @IsOptional()
    @IsString()
    studentId?: string

    @ApiProperty({ description: 'School identifier.', example: 'school-001' })
    @IsString()
    schoolId!: string;

    @ApiProperty({ description: 'Participation year.', example: 2024 })
    @IsNumber()
    year!: number;
}
