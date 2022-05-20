import { User } from '../auth/interfaces/user.interface';
import { BookDto, PaginationSearchParams } from './dto/book.dto';
import { Book } from './interfaces/book.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Request } from 'express';
@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private bookModel: Model<Book>,
    @InjectModel('User') private userModel: Model<User>,
  ) { }

  async findALL(): Promise<Book[]> {
    try {
      const books = await this.bookModel
        .find()
        .select('title price description');
      return books;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Error');
      }
      throw error;
    }
  }

  // findMyAllBook
 
  async findMyAllBook(
     user: string,
     req: Request): Promise<any> {
    try {
      let options = {};

        if (req.query.search) {
            options = {
                $or: [
                    {title: new RegExp(req.query.search.toString(), 'i')},
                    {description: new RegExp(req.query.search.toString(), 'i')},
                ]
            }
        }

        const query = this.bookModel.find(options);

        if (req.query.sort) {
            query.sort({
                price: req.query.sort
            })
        }

        const page: number = parseInt(req.query.page as any) || 1;
        const limit = parseInt(req.query.limit as any) || 5;
        const total = await this.bookModel.count(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Error');
      }
      throw error;
    }
  }


  async create(bookDto: BookDto, userId: string): Promise<Book> {
    try {
      const user = await this.userModel.findById(
        mongoose.Types.ObjectId(userId),
      );
      const data = {
        ...bookDto,
        user: mongoose.Types.ObjectId(userId),
      };
      const book = await this.bookModel.create(data);
      return book;
    } catch (error) {
      throw new ConflictException('Error');
      throw error;
    }
  }

  async get(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id);
      return book;
    } catch (error) {
      throw new ConflictException('Did not found the book');
    }
  }


  async update(id: string, bookDto: BookDto): Promise<Book> {
    try {
      const book = await this.bookModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(id),
        { ...bookDto },
        { new: true },
      );
      return book;
    } catch (error) {
      throw new ConflictException('Did not found the faq');
      throw error;
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findByIdAndDelete(id);
      return book;
    } catch (error) {
      throw new ConflictException('Did not found the faq');
      throw error;
    }
  }
}
