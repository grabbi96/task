import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class AuthCredentialsDto {
  @ApiProperty({
    default: 'grabbi96@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    default: String('1234578'),
  })
  @IsString()
  password: string;
}
