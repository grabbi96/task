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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signIn(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException("Credentials didn't match", common_1.HttpStatus.NOT_FOUND);
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new common_1.HttpException("Credentials didn't match", common_1.HttpStatus.NOT_FOUND);
        }
        if (!user.isActivated || user.accountStatus !== 'ACTIVE') {
            throw new common_1.HttpException({
                message: 'Your account not activated please verify your email',
                token: user.activateToken,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const id = user._id;
        const token = this.jwtService.sign({ id });
        return {
            message: 'Login successful',
            token: token,
        };
    }
    async signUp(signupCredentialsDto) {
        const { name, password, email } = signupCredentialsDto;
        const findUser = await this.userModel.findOne({
            email
        });
        if (findUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const code = Math.floor(100000 + Math.random() * 900000);
        const user = new this.userModel({
            name,
            password: hashedPassword,
            email,
            activateCode: code,
            activateToken: verificationToken,
        });
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('User already exists');
            }
            throw error;
        }
        return {
            message: 'Account created successfully',
            verificationToken,
            code
        };
    }
    async activeAccount(id, accountVerificationDto) {
        const user = await this.userModel.findOne({
            activateToken: id,
        });
        if (!user) {
            throw new common_1.ConflictException('Token is invalid or has expired');
        }
        const userCheck = await this.userModel.findOne({
            activateCode: accountVerificationDto.code,
        });
        if (!userCheck) {
            throw new common_1.ConflictException('Code is invalid');
        }
        userCheck.activateToken = '';
        userCheck.activateCode = '';
        userCheck.isActivated = true;
        userCheck.accountStatus = 'ACTIVE';
        await userCheck.save();
        return {
            message: 'Account verified',
        };
    }
    async validateUser(username, pass) {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(pass, user.password);
        if (valid) {
            return user;
        }
        return null;
    }
    async me(id) {
        try {
            const user = await this.userModel
                .findById(mongoose.Types.ObjectId(id))
                .select('username photo email name userType access_token');
            if (!user) {
                throw new common_1.HttpException("User don't found💀", common_1.HttpStatus.NOT_FOUND);
            }
            if (user) {
                return user;
            }
        }
        catch (err) {
            throw new common_1.HttpException("User don't found💀", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map