"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const book_controller_1 = require("./book/book.controller");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_middleware_1 = require("./common/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const book_module_1 = require("./book/book.module");
const nest_winston_1 = require("nest-winston");
const user_schema_1 = require("./auth/schemas/user.schema");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes('/auth/users', '/auth/me');
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: '/book/all', method: common_1.RequestMethod.GET }, { path: '/book/create', method: common_1.RequestMethod.POST }, '/book/(.*)')
            .forRoutes(book_controller_1.BookController);
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_winston_1.WinstonModule.forRoot({}),
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }),
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            auth_module_1.AuthModule,
            book_module_1.BookModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map