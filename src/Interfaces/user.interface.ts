import mongoose from "mongoose";
import { Role } from "src/enums/roles.enum";

export interface User {
    _id: mongoose.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role
}