import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
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
    const { search, categoryId, userId, limit, page, sort, order } = query;
    const qb = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .orderBy(`post.${sort}`, order as 'ASC' | 'DESC');

    if (search) {
      qb.where('post.title ILIKE :search', { search: `%${search}%` });
    }

    if (userId) {
      qb.andWhere('post.userId = :userId', { userId });
    }

    if (categoryId) {
      qb.andWhere('post.categoryId = :categoryId', { categoryId });
    }

    if (limit !== -1) {
      qb.take(limit).skip((page - 1) * limit);
    }

    const [data, totalRecord] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        totalRecord,
        currentPage: limit === -1 ? 1 : page,
        totalPage: limit === -1 ? 1 : Math.ceil(totalRecord / limit),
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
      relations: ['category', 'user'],
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
      relations: ['category', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .where('post.id = :id', { id })
      .getOne();

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(post: CreatePostDto, userId: number): Promise<Post> {
    const category = await this.categoryService.findOne(post.categoryId);
    const data = await this.postRepository.save({
      ...post,
      userId: userId,
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
