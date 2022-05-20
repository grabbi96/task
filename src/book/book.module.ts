import { HttpErrorFilter } from '../shared/http-error.filter';
import { UserSchema } from '../auth/schemas/user.schema';
import { BookSchema } from './model/book.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class BookModule {}
