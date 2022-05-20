import { Document } from 'mongoose';
export interface User extends Document {
    name: string;
    email: string;
    password: string;
    access_token: string;
    token_type: string;
    activateCode: string;
    activateToken: string;
    isActivated: boolean;
    isAdmin: boolean;
    activateTokenHash: string;
    accountStatus: string;
}
