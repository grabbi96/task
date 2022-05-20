import * as mongoose from 'mongoose';
const defaults = {
  type: String,
  default: '',
};
const booleanDefaults = {
  type: Boolean,
  default: false,
};
/* @ts-ignore */
export const UserSchema = new mongoose.Schema({
  name: defaults,
  email: defaults,
  password: String,
  access_token: defaults,
  token_type: defaults,
  activateCode: defaults,
  activateToken: defaults,
  isActivated: booleanDefaults,
  isAdmin: booleanDefaults,
  activateTokenHash: defaults,
  accountStatus: defaults,
});
