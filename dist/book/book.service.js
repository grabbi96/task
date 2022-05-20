"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
let BookService = class BookService {
    constructor(bookModel, userModel) {
        this.bookModel = bookModel;
        this.userModel = userModel;
    }
    async findALL() {
        try {
            const books = await this.bookModel
                .find()
                .select('title price description');
            return books;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Error');
            }
            throw error;
        }
    }
    async findMyAllBook(user, req) {
        try {
            let options = {};
            if (req.query.search) {
                options = {
                    $or: [
                        { title: new RegExp(req.query.search.toString(), 'i') },
                        { description: new RegExp(req.query.search.toString(), 'i') },
                    ]
                };
            }
            const query = this.bookModel.find(options);
            if (req.query.sort) {
                query.sort({
                    price: req.query.sort
                });
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const total = await this.bookModel.count(options);
            const data = await query.skip((page - 1) * limit).limit(limit).exec();
            return {
                data,
                total,
                page,
                last_page: Math.ceil(total / limit)
            };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Error');
            }
            throw error;
        }
    }
    async create(bookDto, userId) {
        try {
            const user = await this.userModel.findById(mongoose.Types.ObjectId(userId));
            const data = Object.assign(Object.assign({}, bookDto), { user: mongoose.Types.ObjectId(userId) });
            const book = await this.bookModel.create(data);
            return book;
        }
        catch (error) {
            throw new common_1.ConflictException('Error');
            throw error;
        }
    }
    async get(id) {
        try {
            const book = await this.bookModel.findById(id);
            return book;
        }
        catch (error) {
            throw new common_1.ConflictException('Did not found the book');
        }
    }
    async update(id, bookDto) {
        try {
            const book = await this.bookModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), Object.assign({}, bookDto), { new: true });
            return book;
        }
        catch (error) {
            throw new common_1.ConflictException('Did not found the faq');
            throw error;
        }
    }
    async delete(id) {
        try {
            const book = await this.bookModel.findByIdAndDelete(id);
            return book;
        }
        catch (error) {
            throw new common_1.ConflictException('Did not found the faq');
            throw error;
        }
    }
};
BookService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Book')),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map