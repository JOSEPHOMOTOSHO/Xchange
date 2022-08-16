import { Schema } from 'mongoose';

const exchangeRateSchema: Schema = new Schema(
    {
        baseCurrency: {
            type: String,
            required: true,
        },
        quoteCurrency: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default exchangeRateSchema;
