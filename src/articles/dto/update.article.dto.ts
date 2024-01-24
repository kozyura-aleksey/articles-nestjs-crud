import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsDateString()
  @IsNotEmpty()
  date_published: Date;
}
