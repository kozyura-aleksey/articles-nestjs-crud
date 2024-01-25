import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsEmail,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Alex', description: 'User name' })
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'alex@mail.ru', description: 'Email' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '12345678', description: 'Password' })
  password: string;
}
