import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/interfaces/user.interface';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtServie: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    let token;
    // Getting token and check of it's there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new HttpException('Unauthorized 💀 Invalid token', 401);
    }

    try {
      // Verification token
      const decoded = this.jwtServie.verify(token);

      // Check if user still exists
      const freshUser = await this.userModel.findById(decoded.id);
      if (!freshUser) {
        throw new HttpException('Unauthorized 💀 Invalid token', 401);
      }
      req.user = decoded.id;

    } catch (err) {
      throw new HttpException('Unauthorized 💀 Invalid token', 401);
    }
    next();
  }
}
