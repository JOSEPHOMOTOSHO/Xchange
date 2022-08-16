import { IsNumber, IsString } from "class-validator";

export class GetExchangeQuery {
    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;
};
