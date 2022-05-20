import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export interface Book extends Document {
    title: string;
    description: string;
    price: number;
    user: mongoose.Types.ObjectId;
}
