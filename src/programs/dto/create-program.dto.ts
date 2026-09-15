import { IsEnum, IsString } from "class-validator";
import { Program } from "../../common/enum";

export class CreateProgramDto {

    @IsEnum(Program)
    program!: Program;

    @IsString()
    description!: string;

    get id(): string {
        return this.program.trimEnd().toLowerCase();
    }

}
