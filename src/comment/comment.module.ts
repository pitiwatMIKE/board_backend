import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities';
import { PostModule } from 'src/post/post.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule],
  providers: [CommentService, JwtService],
  controllers: [CommentController],
})
export class CommentModule {}
