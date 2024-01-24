import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import * as redisStore from 'cache-manager-redis-store';
import { Article } from './entity/articles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    AuthModule,
  ],
  providers: [ArticlesService, JwtService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
