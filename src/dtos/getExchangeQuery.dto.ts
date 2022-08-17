import { IsNumber, IsString } from "class-validator";

export class GetExchangeQuery {
    @IsString()
    readonly baseCurrency: string;

    @IsString()
    readonly quoteCurrency: string;
};
