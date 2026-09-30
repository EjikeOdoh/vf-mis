import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProgramParticipationDto {

    @ApiPropertyOptional({ description: 'Student identifier.', example: 'student-001' })
    @IsOptional()
    @IsString()
    studentId?: string;

    @ApiProperty({ description: 'Program identifier.', example: 'ASCG' })
    @IsString()
    programId?: string;

    @ApiProperty({ description: 'Participation year.', example: 2024 })
    @IsNumber()
    year!: number;

}
