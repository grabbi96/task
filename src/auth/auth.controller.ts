import {
  Body,
  Controller, Get, HttpCode, Param, Post,
  Req, ValidationPipe
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccountVerificationDto } from './dto/accountVerification.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { User } from './interfaces/user.interface';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto,
  ): Promise<{ message: string; verificationToken: string }> {
    return this.authService.signUp(signupCredentialsDto);
  }

  @Post('signin')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Login successful',
  })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async signIn(
    @Req() req: Request,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; message: string }> {
    
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/me')
  @ApiBearerAuth('JWT')
  async me(@Req() req: Request): Promise<User> {
    return this.authService.me(String(req.user));
  }

  @Post('/activeAccount/:id')
  async activeAccount(
    @Param('id') id: string,
    @Body(ValidationPipe) accountVerificationDto: AccountVerificationDto,
  ): Promise<{ message: string }> {
    return this.authService.activeAccount(id, accountVerificationDto);
  }

}
