import { Controller, Get, Post, Body, Res, Req, Query, UseGuards } from '@nestjs/common';
import { CreateExchangeRate } from '../dtos/createExchangeRate.dto';
import { ExchangerateService } from '../services/exchangerate.service';
import { sendErrorResponse, sendSuccessResponse } from '../helpers/response';
import { Response } from 'express';
import { GetExchangeQuery } from '../dtos/getExchangeQuery.dto';
import { ConvertCurrencyDto } from '../dtos/convertCurrency.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/auth.decorator';
import { RolesGuard } from '../gaurds/roles.gaurds';


@Controller("exchange")
@UseGuards(RolesGuard)
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangerateService) { }

    @Post("/create")
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    async createExchangeRate(@Body() createExchange: CreateExchangeRate, @Res() res: Response): Promise<any> {
        try {
            const exchangeRate = await this.exchangeService.createExchangeRate(createExchange);
            if (exchangeRate.status) {
                return sendSuccessResponse(res, exchangeRate.message, exchangeRate.data, 200);
            }
            return sendErrorResponse(res, exchangeRate.message, {}, 400);
        } catch (error: any) {
            console.log(error);
            return sendErrorResponse(res, 'UNKNOWN_ERROR', {}, 500);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', "user")
    @Get("/")
    async getExchangeRate(@Query() ExchangeQuery: GetExchangeQuery, @Res() res: Response): Promise<any> {
        try {
            const exchangeRate = await this.exchangeService.getExchangeRate(ExchangeQuery);
            if (exchangeRate.status) {
                return sendSuccessResponse(res, exchangeRate.message, exchangeRate.data, 200);
            }
            return sendErrorResponse(res, exchangeRate.message, {}, 400);
        } catch (error: any) {
            console.log(error);
            return sendErrorResponse(res, 'UNKNOWN_ERROR', {}, 500);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', "user")
    @Post("/convert")
    async convertCurrency(@Body() currencyConvertPayload: ConvertCurrencyDto, @Res() res: Response): Promise<any> {
        try {
            const convertedCurrency = await this.exchangeService.convertCurrency(currencyConvertPayload);
            if (convertedCurrency.status) {
                return sendSuccessResponse(res, convertedCurrency.message, convertedCurrency.data, 200);
            }
            console.log(convertedCurrency)
            return sendErrorResponse(res, convertedCurrency.message, {}, 400);
        } catch (error: any) {
            console.log(error);
            return sendErrorResponse(res, 'UNKNOWN_ERROR', {}, 500);
        }
    }
}
