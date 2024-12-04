import { IsEnum, IsNumber, IsString } from "class-validator";
import { Currency } from "src/enum/currency.enum";

export class CreateCourseDto {
    @IsString()
    title: string

    @IsString()
    description: string;

    @IsNumber()
    price: number

    @IsEnum(Currency)
    currency: Currency;
}
