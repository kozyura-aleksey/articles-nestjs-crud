import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create.article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UserDecorator from 'src/decorators/user.decorator';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('articles')
  @CacheTTL(60)
  async getArticles(
    @UserDecorator() user,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    const articles = await this.articlesService.getArticles(
      user.id,
      offset,
      limit,
    );
    return articles;
  }

  @Get(':id')
  async getArticle(@Param('id') id: number, @UserDecorator() user) {
    const article = await this.articlesService.getArticle(id, user.id);
    return article;
  }

  @Post()
  async createArticle(@Body() dto: CreateArticleDto, @UserDecorator() user) {
    const article = await this.articlesService.createArticle(dto, user.id);
    return article;
  }

  @Put(':id')
  async updateArticle(
    @Param('id') id: number,
    @Body() dto: UpdateArticleDto,
    @UserDecorator() user,
  ) {
    const article = await this.articlesService.updateArticle(id, dto, user.id);
    return article;
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: number, @UserDecorator() user) {
    const article = await this.articlesService.deleteArticle(id, user.id);
    return article;
  }

  @Get('author/:authorId')
  async filterArticlesByAuthorId(@Param('authorId') author_id: number) {
    const article = await this.articlesService.filterArticlesByAuthorId(
      author_id,
    );
    return article;
  }
}
