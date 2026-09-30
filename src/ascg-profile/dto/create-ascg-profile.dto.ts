import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProperNoun } from "src/common/decorators/proper.decorator";

export class CreateAscgProfileDto {
    @ApiPropertyOptional({ description: 'Student identifier.', example: 'student-001' })
    @IsOptional()
    @IsString()
    studentId?: string;

    @ApiPropertyOptional({ description: 'School identifier.', example: 'school-001' })
    @IsOptional()
    @IsString()
    schoolId?: string;

    @ApiPropertyOptional({ description: 'Father last name.', example: 'Doe' })
    @IsOptional()
    @IsString()
    @ProperNoun()
    fatherLastName?: string;

    @ApiPropertyOptional({ description: 'Father first name.', example: 'John' })
    @IsOptional()
    @IsString()
    @ProperNoun()
    fatherFirstName?: string;

    @ApiPropertyOptional({ description: 'Father phone number.', example: '+2348000000000' })
    @IsOptional()
    @IsString()
    fatherPhone?: string;

    @ApiPropertyOptional({ description: 'Father education level.', example: 'Bachelor degree' })
    @IsOptional()
    @IsString()
    fatherEducation?: string;

    @ApiPropertyOptional({ description: 'Mother last name.', example: 'Doe' })
    @IsOptional()
    @IsString()
    @ProperNoun()
    motherLastName?: string;

    @ApiPropertyOptional({ description: 'Mother first name.', example: 'Jane' })
    @IsOptional()
    @IsString()
    @ProperNoun()
    motherFirstName?: string;

    @ApiPropertyOptional({ description: 'Mother phone number.', example: '+2348000000001' })
    @IsOptional()
    @IsString()
    motherPhone?: string;

    @ApiPropertyOptional({ description: 'Mother education level.', example: 'Senior secondary' })
    @IsOptional()
    @IsString()
    motherEducation?: string;

    @ApiPropertyOptional({ description: 'Number of brothers.', example: '2' })
    @IsOptional()
    @IsString()
    numberOfBrothers?: string;

    @ApiPropertyOptional({ description: 'Number of sisters.', example: '1' })
    @IsOptional()
    @IsString()
    numberOfSisters?: string;

    @ApiPropertyOptional({ description: 'Position in family.', example: 'First born' })
    @IsOptional()
    @IsString()
    positionInFamily?: string;

    @ApiPropertyOptional({ description: 'Specialization area.', example: 'Computer Science' })
    @IsOptional()
    @IsString()
    specialization?: string;

    @ApiPropertyOptional({ description: 'Favorite subject.', example: 'Mathematics' })
    @IsOptional()
    @IsString()
    favouriteSubject?: string;

    @ApiPropertyOptional({ description: 'Most difficult subject.', example: 'Physics' })
    @IsOptional()
    @IsString()
    mostDifficultSubject?: string;

    @ApiPropertyOptional({ description: 'First career choice.', example: 'Software Engineer' })
    @IsOptional()
    @IsString()
    careerChoice1?: string;

    @ApiPropertyOptional({ description: 'Second career choice.', example: 'Data Analyst' })
    @IsOptional()
    @IsString()
    careerChoice2?: string;

    @ApiPropertyOptional({ description: 'Year associated with the profile.', example: 2024 })
    @IsOptional()
    @IsNumber()
    year?: number;
}
