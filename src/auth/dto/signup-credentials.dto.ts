import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNotEmpty, IsString, MaxLength,
  MinLength
} from 'class-validator';
import { Match } from './match.decorator';
export class SignupCredentialsDto {
  @ApiProperty({
    default: 'rabbi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    default: 'grabbi96@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    default: 'asdfasdf',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;

}
