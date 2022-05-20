import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../auth/interfaces/user.interface';
export declare class AuthMiddleware implements NestMiddleware {
    private jwtServie;
    private userModel;
    constructor(jwtServie: JwtService, userModel: Model<User>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
