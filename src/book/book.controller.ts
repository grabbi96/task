import {
  Body, ConflictException, Controller,
  Delete,
  Get,
  Param, Patch, Post, Query, Req, ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BookService } from './book.service';
import {
  BookDto, BookDtoUpdate, PaginationSearchParams
} from './dto/book.dto';
import { Book } from './interfaces/book.interface';

@Controller('book')
@ApiTags('Book')
export class BookController {
  constructor(
    private bookService: BookService,
  ) { }

  @Get('/all')
  @ApiBearerAuth('JWT')
  async listAll(): Promise<Book[]> {
    return this.bookService.findALL();
  }

  @Get('/myBooks')
  @ApiBearerAuth('JWT')
  async myBooks(
    @Req() req: Request,
  ): Promise<Book[]> {
    return this.bookService.findMyAllBook(String(req.user), req);
  }


  @Post('create')
  @ApiBearerAuth('JWT')
  async create(
    @Req() req: Request,
    @Body(ValidationPipe) bookDto: BookDto,
  ): Promise<Book> {
    try {

      return this.bookService.create(bookDto, String(req.user));
    } catch (err) {
      throw new ConflictException('Error');
    }
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  read(@Param('id') id: string): Promise<Book> {
    return this.bookService.get(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) bookDto: BookDtoUpdate,
  ): Promise<Book> {
    try {


      return this.bookService.update(id, bookDto);
    } catch (err) {
      throw new ConflictException('Error');
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  delete(@Param('id') id: string): Promise<Book> {
    return this.bookService.delete(id);
  }
}
