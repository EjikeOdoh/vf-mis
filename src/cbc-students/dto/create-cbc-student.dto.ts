import { IsString } from "class-validator";
import { ProperNoun } from "src/common/decorators/proper.decorator";

export class CreateCbcStudentDto {
    @IsString()
    @ProperNoun()
    firstName!: string;

    @IsString()
    @ProperNoun()
    lastName!: string;
}
