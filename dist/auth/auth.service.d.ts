import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AccountVerificationDto } from './dto/accountVerification.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './interfaces/user.interface';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        token: string;
        message: string;
    }>;
    signUp(signupCredentialsDto: SignupCredentialsDto): Promise<{
        message: string;
        verificationToken: string;
        code: number;
    }>;
    activeAccount(id: string, accountVerificationDto: AccountVerificationDto): Promise<{
        message: string;
    }>;
    validateUser(username: string, pass: string): Promise<User>;
    me(id: string): Promise<User>;
}
