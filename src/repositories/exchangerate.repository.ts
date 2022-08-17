import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateExchangeRate } from "../dtos/createExchangeRate.dto";
import { Exchangerate } from "../Interfaces/exchangerate.interface";
import { makeResponse } from "../helpers/response";
import { GetExchangeQuery } from "../dtos/getExchangeQuery.dto";
import { ConvertCurrencyDto } from "../dtos/convertCurrency.dto";

@Injectable()
export class ExchangeRateRepository {
    constructor(@InjectModel("exchangeRate") private readonly exhchangerate: Model<Exchangerate>) { }
    async createExchange(createExchange: CreateExchangeRate): Promise<any> {
        const getExchangeRate = await this.exhchangerate.findOne({ baseCurrency: createExchange.baseCurrency, quoteCurrency: createExchange.quoteCurrency })
        if (getExchangeRate) {
            const updateExchangeRate = await this.exhchangerate.findOneAndUpdate({ baseCurrency: createExchange.baseCurrency, quoteCurrency: createExchange.quoteCurrency }, { rate: createExchange.rate }, { new: true })
            await this.exhchangerate.findOneAndUpdate({ quoteCurrency: createExchange.baseCurrency, baseCurrency: createExchange.quoteCurrency }, { rate: 1 / createExchange.rate }, { new: true })
            return makeResponse(true, "EXCHANGE_RATE_UPDATED", { rate: updateExchangeRate })
        }
        const exchangeRate = await new this.exhchangerate({
            quoteCurrency: createExchange.quoteCurrency.toUpperCase(),
            baseCurrency: createExchange.baseCurrency.toUpperCase(),
            rate: createExchange.rate,
        }).save();

        await new this.exhchangerate({
            quoteCurrency: createExchange.baseCurrency.toUpperCase(),
            baseCurrency: createExchange.quoteCurrency.toUpperCase(),
            rate: 1 / createExchange.rate,
        }).save();

        if (!exchangeRate) {
            return makeResponse(true, "EXCHANGE_RATE_ERROR", {})
        }
        return makeResponse(true, "EXCHANGE_RATE_SUCCESS", { rate: exchangeRate })
    }

    async getExchangeRate(exchangerateQuery: GetExchangeQuery): Promise<any> {
        const { baseCurrency, quoteCurrency } = exchangerateQuery
        const getExchangeRate = await this.exhchangerate.findOne({ baseCurrency: baseCurrency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase() })
        if (getExchangeRate) {
            return makeResponse(true, "EXCHANGE_RATE_RETRIEVED", { rate: getExchangeRate })
        }
        return makeResponse(false, "EXCHANGE_RATE_FAILED_RETRIEVAL", {})
    }


    async convertCurrency(convertCurrencyPayload: ConvertCurrencyDto): Promise<any> {
        const amount = convertCurrencyPayload.amount
        const getExchangeRate = await this.exhchangerate.findOne({ baseCurrency: convertCurrencyPayload.baseCurrency, quoteCurrency: convertCurrencyPayload.quoteCurrency })
        if (getExchangeRate) {
            const convertedCurrency = amount * getExchangeRate.rate
            return makeResponse(true, "CURRENCY_CONVERTED", { convertedValue: convertedCurrency })
        }
        return makeResponse(false, "CURRENCY_CONVERTED_ERROR", {})
    }
}

