"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose = require("mongoose");
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
};
exports.BookSchema = new mongoose.Schema({
    title: defaults,
    price: defaultsNumber,
    description: defaults,
    user: userType,
}, { timestamps: true });
//# sourceMappingURL=book.model.js.map