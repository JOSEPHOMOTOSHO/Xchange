import { Keyable } from '../Interfaces/keyable.interface';
class Message {
    messages: Keyable;
    constructor() {
        this.messages = {
            UNKNOWN_ERROR: 'An unknown error occurred',
            USER_SUCCESS: "Successfully created user",
            USER_ERROR: "Error creating user",
            INVALID_CREDENTIALS: "Wrong email or password.",
            EMAIL_NOT_UNIQUE: "Email has been used",
            CURRENCY_CONVERTED: 'Successfully converted currency',
            CURRENCY_CONVERTED_ERROR: 'Error occured while converting currency',
            EXCHANGE_RATE_SUCCESS: 'Successfully created exchange',
            EXCHANGE_RATE_ERROR: 'Error occured while creating exchange rate',
            EXCHANGE_RATE_UPDATED: 'Successfully updated exchange rate',
            EXCHANGE_RATE_RETRIEVED: 'Successfully retrieved exchange rate',
            EXCHANGE_RATE_FAILED_RETRIEVAL: 'Error occured while getting exchange rate',
        };
    }

    getMessage(key: string): string {
        return this.messages[key];
    }
}

export default new Message();
