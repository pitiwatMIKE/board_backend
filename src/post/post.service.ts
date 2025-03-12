import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { CategoryService } from 'src/category/category.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    console.log(post);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(post: CreatePostDto, payload: JwtPayload): Promise<Post> {
    const category = await this.categoryService.findOne(post.categoryId);
    const data = await this.postRepository.save({
      ...post,
      userId: payload.id,
      categoryId: category.id,
    });
    return this.findOne(data.id);
  }

  async update(
    id: number,
    post: UpdatePostDto,
    decode: JwtPayload,
  ): Promise<Post> {
    if (post?.categoryId) {
      await this.categoryService.findOne(post.categoryId);
    }
    await this.postRepository.update(id, {
      ...post,
      userId: decode.id,
      categoryId: post.categoryId,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.postRepository.delete(id);
  }
}
