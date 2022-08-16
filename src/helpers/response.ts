import handler from '../helpers/message';
import { Response } from 'express';
import { Keyable } from '../Interfaces/keyable.interface';


const makeResponse = (status: boolean, message: string, data: Keyable) => {
    if (status) {
        return {
            status,
            message: message,
            data: data,
        };
    }
    return {
        status,
        message: message,
        data: data,
    };
};

const sendSuccessResponse = (
    res: Response,
    message: string,
    data: object,
    statusCode: number = 200
) => {
    return res.status(statusCode).json({
        status: true,
        message: handler.getMessage(message) || message,
        data: data,
    });
};

const sendErrorResponse = (
    res: Response,
    message: string,
    data: object,
    statusCode: number = 400
) => {
    return res.status(statusCode).json({
        status: false,
        message: handler.getMessage(message) || message,
        data: data,
    });
};

export {
    sendSuccessResponse,
    sendErrorResponse,
    makeResponse,
};
