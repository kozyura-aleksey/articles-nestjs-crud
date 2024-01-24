import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Article } from './entity/articles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create.article.dto';
import { IArticle } from './interfaces/article.interface';
import { UpdateArticleDto } from './dto/update.article.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createArticle(
    dto: CreateArticleDto,
    author_id: number,
  ): Promise<IArticle> {
    try {
      await this.cacheManager.del('articles');
      const article: IArticle = await this.articlesRepository.save({
        ...dto,
        author_id: author_id,
      });
      return article;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Не удалось создать статью');
    }
  }

  async getArticle(id: number, author_id: number): Promise<IArticle> {
    const article: IArticle = await this.articlesRepository.findOne({
      where: {
        id: id,
        author_id: author_id,
      },
    });

    return article;
  }

  async getArticles(
    author_id: number,
    offset?: number,
    limit?: number,
  ): Promise<IArticle[]> {
    const cachedData: IArticle[] = await this.cacheManager.get('articles');
    if (cachedData) {
      return cachedData;
    }
    const articles: IArticle[] = await this.articlesRepository.find({
      skip: offset,
      take: limit,
      where: {
        author_id: author_id,
      },
    });
    await this.cacheManager.set('articles', articles);
    return articles;
  }

  async updateArticle(
    id: number,
    dto: UpdateArticleDto,
    author_id: number,
  ): Promise<IArticle> {
    try {
      await this.cacheManager.del('articles');
      await this.articlesRepository.update(
        {
          id: id,
          author_id: author_id,
        },
        {
          ...dto,
        },
      );
      return this.getArticle(id, author_id);
    } catch {
      throw new BadRequestException('Не удалось обновить статью');
    }
  }

  async deleteArticle(id: number, author_id: number): Promise<string> {
    try {
      await this.articlesRepository.delete({
        id: id,
        author_id: author_id,
      });
      return 'Статья удалена';
    } catch {
      throw new BadRequestException('Не удалось удалить статью');
    }
  }

  async filterArticlesByAuthorId(author_id: number): Promise<IArticle[]> {
    const articles: IArticle[] = await this.articlesRepository.find({
      where: {
        author_id: author_id,
      },
    });
    return articles;
  }
}
