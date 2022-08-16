import { IsNumber, IsString } from "class-validator";

export class ConvertCurrencyDto {
    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;

    @IsNumber()
    amount: number;
};
