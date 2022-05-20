import { Request } from 'express';
import { BookService } from './book.service';
import { BookDto, BookDtoUpdate } from './dto/book.dto';
import { Book } from './interfaces/book.interface';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    listAll(): Promise<Book[]>;
    myBooks(req: Request): Promise<Book[]>;
    create(req: Request, bookDto: BookDto): Promise<Book>;
    read(id: string): Promise<Book>;
    update(id: string, bookDto: BookDtoUpdate): Promise<Book>;
    delete(id: string): Promise<Book>;
}
