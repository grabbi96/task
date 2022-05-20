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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationSearchParams = exports.BookDtoUpdate = exports.BookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BookDto {
}
__decorate([
    swagger_1.ApiProperty({
        default: 'anything',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BookDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        default: 'anything',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BookDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        default: 1000,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BookDto.prototype, "price", void 0);
exports.BookDto = BookDto;
class BookDtoUpdate {
}
__decorate([
    swagger_1.ApiProperty({
        default: 'anything',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BookDtoUpdate.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        default: 'anything',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BookDtoUpdate.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        default: 1000,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BookDtoUpdate.prototype, "price", void 0);
exports.BookDtoUpdate = BookDtoUpdate;
class PaginationSearchParams {
}
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], PaginationSearchParams.prototype, "skip", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], PaginationSearchParams.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PaginationSearchParams.prototype, "search", void 0);
exports.PaginationSearchParams = PaginationSearchParams;
//# sourceMappingURL=book.dto.js.map