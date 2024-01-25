import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Покормить кота', description: 'Title of article' })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Взять корм в холодильнике и покормить кота',
    description: 'Description of article',
  })
  description: string;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '"2010-08-17 12:09:36"', description: 'Date' })
  date_published: Date;
}
