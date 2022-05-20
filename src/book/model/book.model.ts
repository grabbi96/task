import * as mongoose from 'mongoose';
import crypto from 'crypto';
const defaults = {
  type: String,
  default: '',
};
const defaultsNumber = {
  type: Number,
  default: 0,
};
const userType = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}
/* @ts-ignore */
export const BookSchema = new mongoose.Schema({
  title: defaults,
  price: defaultsNumber,
  description: defaults,
  user: userType,
}, {timestamps: true});
