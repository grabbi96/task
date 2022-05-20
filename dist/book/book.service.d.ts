import { User } from '../auth/interfaces/user.interface';
import { BookDto } from './dto/book.dto';
import { Book } from './interfaces/book.interface';
import { Model } from 'mongoose';
import { Request } from 'express';
export declare class BookService {
    private bookModel;
    private userModel;
    constructor(bookModel: Model<Book>, userModel: Model<User>);
    findALL(): Promise<Book[]>;
    findMyAllBook(user: string, req: Request): Promise<any>;
    create(bookDto: BookDto, userId: string): Promise<Book>;
    get(id: string): Promise<Book>;
    update(id: string, bookDto: BookDto): Promise<Book>;
    delete(id: string): Promise<Book>;
}
