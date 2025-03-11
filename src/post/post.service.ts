import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<PostDto> {
    const post = await this.postRepository.findOneBy({ id: id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
}
