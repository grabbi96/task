import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccountVerificationDto } from './dto/accountVerification.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './interfaces/user.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signupCredentialsDto: SignupCredentialsDto): Promise<{
        message: string;
        verificationToken: string;
    }>;
    signIn(req: Request, authCredentialsDto: AuthCredentialsDto): Promise<{
        token: string;
        message: string;
    }>;
    me(req: Request): Promise<User>;
    activeAccount(id: string, accountVerificationDto: AccountVerificationDto): Promise<{
        message: string;
    }>;
}
