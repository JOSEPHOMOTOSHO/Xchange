import { Schema } from 'mongoose';
import { Role } from 'src/enums/roles.enum';
import * as bcrypt from 'bcrypt';

const userSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            enum: Role,
            required: true,
            default: [Role.User]
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

export default userSchema;
