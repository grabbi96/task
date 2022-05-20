"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const defaults = {
    type: String,
    default: '',
};
const booleanDefaults = {
    type: Boolean,
    default: false,
};
exports.UserSchema = new mongoose.Schema({
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
//# sourceMappingURL=user.schema.js.map