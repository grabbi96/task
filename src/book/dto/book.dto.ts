import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsNumber, IsOptional, IsString, Min, min
} from 'class-validator';

export class BookDto {


  @ApiProperty({
    default: 'anything',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    default: 'anything',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    default: 1000,
  })
  @IsNotEmpty()
  price: number;

}

export class BookDtoUpdate {
  @ApiProperty({
    default: 'anything',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    default: 'anything',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    default: 1000,
  })
  @IsNotEmpty()
  price: number;
}

export class PaginationSearchParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;
 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}