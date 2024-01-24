import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
