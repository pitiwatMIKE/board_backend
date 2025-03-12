import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities';
import { JwtService } from '@nestjs/jwt';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoryModule],
  providers: [PostService, JwtService],
  controllers: [PostController],
})
export class PostModule {}
