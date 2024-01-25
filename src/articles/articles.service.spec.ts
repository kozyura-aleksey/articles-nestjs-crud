import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './entity/articles.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => []),
    save: jest.fn((entity) => entity),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repositoryMock: MockType<Repository<Article>>;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useFactory: repositoryMockFactory,
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            del: jest.fn(),
            save: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    repositoryMock = module.get(getRepositoryToken(Article));
    service = module.get<ArticlesService>(ArticlesService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be create article', async () => {
    const createArticle = {
      title: 'Покормить кота',
      description: 'Взять в холодильнике кискас и покормить кота',
      date_published: new Date(),
    };
    const author_id = 2;
    const result = await service.createArticle(createArticle, author_id);
    expect(result).toBeDefined();
    expect(result.title).toBe(createArticle.title);
    expect(result.description).toBe(createArticle.description);
    expect(result.date_published).toBe(createArticle.date_published);
  });

  it('should be every element in array is object', async () => {
    const result = await service.getArticles(2);
    expect(result).toBeInstanceOf(Object);
  });

  it('should be return array article', async () => {
    const result = await service.getArticles(2);
    expect(Array.isArray(result)).toBe(true);
  });
});
