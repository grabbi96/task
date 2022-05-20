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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtServie, userModel) {
        this.jwtServie = jwtServie;
        this.userModel = userModel;
    }
    async use(req, res, next) {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new common_1.HttpException('Unauthorized 💀 Invalid token', 401);
        }
        try {
            const decoded = this.jwtServie.verify(token);
            const freshUser = await this.userModel.findById(decoded.id);
            if (!freshUser) {
                throw new common_1.HttpException('Unauthorized 💀 Invalid token', 401);
            }
            req.user = decoded.id;
        }
        catch (err) {
            throw new common_1.HttpException('Unauthorized 💀 Invalid token', 401);
        }
        next();
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map