import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AcademicTerm } from '../../common/enum';

export class CreateAcademicsDto {
  @ApiProperty({ example: 2024, description: 'Academic year' })
  @IsNumber()
  year!: number;

  @ApiProperty({ example: 12, description: 'Improved count' })
  @IsNumber()
  improved!: number;

  @ApiProperty({ example: 8, description: 'Stable count' })
  @IsNumber()
  stable!: number;

  @ApiProperty({ example: 3, description: 'Declined count' })
  @IsNumber()
  declined!: number;
}

export class CreateGpaDto {
  @ApiProperty({ example: 2024, description: 'Academic year' })
  @IsNumber()
  year!: number;

  @ApiProperty({ enum: AcademicTerm, example: AcademicTerm.TERM_1, description: 'Academic term' })
  @IsEnum(AcademicTerm)
  term!: AcademicTerm;

  @ApiProperty({ example: 3.8, description: 'GPA value' })
  @IsNumber()
  gpa!: number;

  @ApiProperty({ example: 120, description: 'Number of records' })
  @IsNumber()
  numberOfRecords!: number;

  @ApiProperty({ example: 84.2, description: 'Percentage value' })
  @IsNumber()
  percentage!: number;
}

export class CreateGradeDto {
  @ApiProperty({ example: 2024, description: 'Academic year' })
  @IsNumber()
  year!: number;

  @ApiProperty({ example: 'Mathematics', description: 'Subject name' })
  @IsString()
  subject!: string;

  @ApiProperty({ example: 'Biology', description: 'Paired subject' })
  @IsString()
  paired!: string;

  @ApiProperty({ example: 78, description: 'Term 1 grade' })
  @IsNumber()
  term1!: number;

  @ApiProperty({ example: 82, description: 'Term 2 grade' })
  @IsNumber()
  term2!: number;

  @ApiProperty({ example: 89, description: 'Term 3 grade' })
  @IsNumber()
  term3!: number;

  @ApiProperty({ example: 5, description: 'Improved count' })
  @IsNumber()
  improved!: number;

  @ApiProperty({ example: 4, description: 'Stable count' })
  @IsNumber()
  stable!: number;

  @ApiProperty({ example: 2, description: 'Declined count' })
  @IsNumber()
  declined!: number;
}

export class CreatePerformanceDto {
  @ApiProperty({ example: 2024, description: 'Academic year' })
  @IsNumber()
  year!: number;

  @ApiProperty({ enum: AcademicTerm, example: AcademicTerm.TERM_1, description: 'Academic term' })
  @IsEnum(AcademicTerm)
  term!: AcademicTerm;

  @ApiProperty({ example: 30, description: 'Excellent count' })
  @IsNumber()
  excellent!: number;

  @ApiProperty({ example: 20, description: 'Good count' })
  @IsNumber()
  good!: number;

  @ApiProperty({ example: 15, description: 'Fair count' })
  @IsNumber()
  fair!: number;

  @ApiProperty({ example: 10, description: 'Poor count' })
  @IsNumber()
  poor!: number;
}

export class CreateAcademicsBatchDto {
  @ApiProperty({ type: [CreateAcademicsDto], description: 'Academic summary records' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAcademicsDto)
  academics!: CreateAcademicsDto[];

  @ApiProperty({ type: [CreateGpaDto], description: 'GPA records' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGpaDto)
  gpa!: CreateGpaDto[];

  @ApiProperty({ type: [CreateGradeDto], description: 'Grade records' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGradeDto)
  grades!: CreateGradeDto[];

  @ApiProperty({ type: [CreatePerformanceDto], description: 'Performance records' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePerformanceDto)
  performance!: CreatePerformanceDto[];
}
