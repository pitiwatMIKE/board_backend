import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { CategoryService } from 'src/category/category.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { MyPostDto } from './dto/my-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoryService: CategoryService,
  ) {}

  async searchPosts(query: SearchPostDto) {
    const { search, limit, page, sort, order } = query;
    const where = search ? { title: Like(`%${search}%`) } : {};

    const [data, totalRecord] = await this.postRepository.findAndCount({
      where,
      order: { [sort]: order },
      take: limit,
      skip: (page - 1) * limit,
      relations: ['category'],
    });

    return {
      data,
      meta: {
        totalRecord,
        currentPage: page,
        totalPage: Math.ceil(totalRecord / limit),
      },
    };
  }

  async findMyPosts(query: MyPostDto, userId: number) {
    const { limit, page, sort, order } = query;

    const [data, totalRecord] = await this.postRepository.findAndCount({
      where: { userId: userId },
      order: { [sort]: order },
      take: limit,
      skip: (page - 1) * limit,
      relations: ['category'],
    });

    return {
      data,
      meta: {
        totalRecord,
        currentPage: page,
        totalPage: Math.ceil(totalRecord / limit),
      },
    };
  }

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

  async update(id: number, userId: number, post: UpdatePostDto): Promise<Post> {
    await this.validatePermission(id, userId);
    if (post?.categoryId) {
      await this.categoryService.findOne(post.categoryId);
    }

    await this.postRepository.update(id, {
      ...post,
      userId: userId,
      categoryId: post.categoryId,
    });
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.validatePermission(id, userId);
    await this.postRepository.delete(id);
  }

  private async validatePermission(id: number, userId: number): Promise<void> {
    const existingPost = await this.findOne(id);
    if (existingPost.userId !== userId) {
      throw new ForbiddenException('Forbidden');
    }
  }
}
