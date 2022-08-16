import mongoose from "mongoose";

export interface Exchangerate {
    _id: mongoose.Types.ObjectId,
    baseCurrency: string,
    quoteCurrency: string,
    rate: number
}