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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const book_service_1 = require("./book.service");
const book_dto_1 = require("./dto/book.dto");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async listAll() {
        return this.bookService.findALL();
    }
    async myBooks(req) {
        return this.bookService.findMyAllBook(String(req.user), req);
    }
    async create(req, bookDto) {
        try {
            return this.bookService.create(bookDto, String(req.user));
        }
        catch (err) {
            throw new common_1.ConflictException('Error');
        }
    }
    read(id) {
        return this.bookService.get(id);
    }
    async update(id, bookDto) {
        try {
            return this.bookService.update(id, bookDto);
        }
        catch (err) {
            throw new common_1.ConflictException('Error');
        }
    }
    delete(id) {
        return this.bookService.delete(id);
    }
};
__decorate([
    common_1.Get('/all'),
    swagger_1.ApiBearerAuth('JWT'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "listAll", null);
__decorate([
    common_1.Get('/myBooks'),
    swagger_1.ApiBearerAuth('JWT'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "myBooks", null);
__decorate([
    common_1.Post('create'),
    swagger_1.ApiBearerAuth('JWT'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_dto_1.BookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiBearerAuth('JWT'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "read", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiBearerAuth('JWT'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, book_dto_1.BookDtoUpdate]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiBearerAuth('JWT'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "delete", null);
BookController = __decorate([
    common_1.Controller('book'),
    swagger_1.ApiTags('Book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map