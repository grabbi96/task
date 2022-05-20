import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
export class AccountVerificationDto {
  @ApiProperty({
    default: 'cube1',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}
