import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from "class-validator";
import { Program } from "../../common/enum";

export class CreateProgramDto {

    @ApiProperty({ description: 'Program type.', enum: Program, example: Program.ASCG })
    @IsEnum(Program)
    program!: Program;

    @ApiProperty({ description: 'Program description.', example: 'Academic and skills development program.' })
    @IsString()
    description!: string;

    get id(): string {
        return this.program.trimEnd().toLowerCase();
    }

}
