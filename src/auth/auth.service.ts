import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { AccountVerificationDto } from './dto/accountVerification.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; message: string }> {
    const { email, password } = authCredentialsDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException("Credentials didn't match", HttpStatus.NOT_FOUND);
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new HttpException("Credentials didn't match", HttpStatus.NOT_FOUND);
    }

    if (!user.isActivated || user.accountStatus !== 'ACTIVE') {
      throw new HttpException(
        {
          message: 'Your account not activated please verify your email',
          token: user.activateToken,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const id = user._id;
    const token = this.jwtService.sign({ id });
    return {
      message: 'Login successful',
      token: token,
    };
  }


  async signUp(
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<{ message: string; verificationToken: string, code:number }> {
    const { name, password, email } = signupCredentialsDto;
    
    const findUser = await this.userModel.findOne({
      email
    });

    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const code = Math.floor(100000 + Math.random() * 900000);

    const user = new this.userModel({
      name,
      password: hashedPassword,
      email,
      activateCode: code,
      activateToken: verificationToken,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
    return {
      message: 'Account created successfully',
      verificationToken,
      code
    };
  }

  async activeAccount(
    id: string,
    accountVerificationDto: AccountVerificationDto,
  ): Promise<{ message: string }> {
    // get user
    const user = await this.userModel.findOne({
      activateToken: id,
    });

    if (!user) {
      throw new ConflictException('Token is invalid or has expired');
    }

    const userCheck = await this.userModel.findOne({
      activateCode: accountVerificationDto.code,
    });

    if (!userCheck) {
      throw new ConflictException('Code is invalid');
    }


    // save user activated
    userCheck.activateToken = '';
    userCheck.activateCode = '';
    userCheck.isActivated = true;
    userCheck.accountStatus = 'ACTIVE';
    await userCheck.save();

    return {
      message: 'Account verified',
    };
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async me(id: string): Promise<User> {
    try {
      const user = await this.userModel
        .findById(mongoose.Types.ObjectId(id))
        .select('username photo email name userType access_token');

      if (!user) {
        throw new HttpException("User don't found💀", HttpStatus.NOT_FOUND);
      }

      if (user) {
        return user;
      }

    } catch (err) {
      throw new HttpException("User don't found💀", HttpStatus.NOT_FOUND);
    }
  }
}
