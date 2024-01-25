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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IArticle } from './interfaces/article.interface';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('articles')
  @CacheTTL(60)
  @ApiOperation({ summary: 'Array of articles' })
  @ApiResponse({ status: 200 })
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
  @ApiOperation({ summary: 'Get one article' })
  @ApiResponse({ status: 200 })
  async getArticle(@Param('id') id: number, @UserDecorator() user) {
    const article = await this.articlesService.getArticle(id, user.id);
    return article;
  }

  @Post()
  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 200 })
  async createArticle(@Body() dto: CreateArticleDto, @UserDecorator() user) {
    const article = await this.articlesService.createArticle(dto, user.id);
    return article;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update article' })
  @ApiResponse({ status: 200 })
  async updateArticle(
    @Param('id') id: number,
    @Body() dto: UpdateArticleDto,
    @UserDecorator() user,
  ) {
    const article = await this.articlesService.updateArticle(id, dto, user.id);
    return article;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete article' })
  @ApiResponse({ status: 200 })
  async deleteArticle(@Param('id') id: number, @UserDecorator() user) {
    const article = await this.articlesService.deleteArticle(id, user.id);
    return article;
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Sort articles by author_id' })
  @ApiResponse({ status: 200 })
  async filterArticlesByAuthorId(@Param('authorId') author_id: number) {
    const article = await this.articlesService.filterArticlesByAuthorId(
      author_id,
    );
    return article;
  }
}
