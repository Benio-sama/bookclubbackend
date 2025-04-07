import { IsDate, IsDateString, IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateMemberDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsIn(["M", "F"])
    gender?: string;

    @IsNotEmpty()
    @IsDateString()
    birth_date: Date;
}
