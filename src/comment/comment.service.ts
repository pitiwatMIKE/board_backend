import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentPostIdDto } from './dto/comment-post-id.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async findCommentsByPostId(query: CommentPostIdDto) {
    const { limit, page, sort, order, postId } = query;

    const [data, totalRecord] = await this.commentRepository.findAndCount({
      where: { postId },
      order: { [sort]: order },
      take: limit,
      skip: (page - 1) * limit,
      relations: ['user'],
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

  async findAll(): Promise<Comment[]> {
    const data = await this.commentRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return data;
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async create(comment: CreateCommentDto, userId: number): Promise<Comment> {
    const post = await this.postService.findOne(comment.postId);
    const data = await this.commentRepository.save({
      ...comment,
      postId: post.id,
      userId: userId,
    });
    return this.findOne(data.id);
  }

  async update(
    id: number,
    userId: number,
    comment: CreateCommentDto,
  ): Promise<Comment> {
    await this.validatePermission(id, userId);
    await this.commentRepository.update(id, comment);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.validatePermission(id, userId);
    await this.commentRepository.delete(id);
  }

  private async validatePermission(id: number, userId: number): Promise<void> {
    const existingComment = await this.findOne(id);
    if (existingComment.user.id !== userId) {
      throw new ForbiddenException('Forbidden');
    }
  }
}
