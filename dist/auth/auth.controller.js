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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const accountVerification_dto_1 = require("./dto/accountVerification.dto");
const auth_credentials_dto_1 = require("./dto/auth-credentials.dto");
const signup_credentials_dto_1 = require("./dto/signup-credentials.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signupCredentialsDto) {
        return this.authService.signUp(signupCredentialsDto);
    }
    async signIn(req, authCredentialsDto) {
        return this.authService.signIn(authCredentialsDto);
    }
    async me(req) {
        return this.authService.me(String(req.user));
    }
    async activeAccount(id, accountVerificationDto) {
        return this.authService.activeAccount(id, accountVerificationDto);
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_credentials_dto_1.SignupCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('signin'),
    common_1.HttpCode(200),
    swagger_1.ApiOkResponse({
        description: 'Login successful',
    }),
    swagger_1.ApiResponse({ status: 404, description: 'Forbidden.' }),
    __param(0, common_1.Req()),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Get('/me'),
    swagger_1.ApiBearerAuth('JWT'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    common_1.Post('/activeAccount/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accountVerification_dto_1.AccountVerificationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activeAccount", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map