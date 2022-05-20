import { BookController } from './book/book.controller';
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './common/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { BookModule } from './book/book.module';
import { WinstonModule } from 'nest-winston';
import { UserSchema } from './auth/schemas/user.schema';

@Module({
  imports: [
    WinstonModule.forRoot({}),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),

    JwtModule.register({ secret: process.env.JWT_SECRET }),

    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/auth/users', '/auth/me');



    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/book/all', method: RequestMethod.GET },
        { path: '/book/create', method: RequestMethod.POST },
        '/book/(.*)',
      )
      .forRoutes(BookController);

  }
}
