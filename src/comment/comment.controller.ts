import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import {
  CommentPostIdDto,
  CommentPostIdResponseDto,
} from './dto/comment-post-id.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('by-post')
  @ApiResponse({ status: 200, type: CommentPostIdResponseDto })
  async findCommentsByPostId(
    @Query() query: CommentPostIdDto,
  ): Promise<CommentPostIdResponseDto> {
    const comments = await this.commentService.findCommentsByPostId(query);
    const data = plainToInstance(CommentPostIdResponseDto, comments, {
      excludeExtraneousValues: true,
    });

    return data;
  }

  @Get()
  @ApiResponse({ status: 200, type: [CommentDto] })
  async findAll(): Promise<CommentDto[]> {
    const comments = await this.commentService.findAll();
    return plainToInstance(CommentDto, comments, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: CommentDto })
  async findOne(id: number): Promise<CommentDto> {
    const comment = await this.commentService.findOne(id);
    return plainToInstance(CommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiResponse({ status: 201, type: CommentDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Request() req: { user: JwtPayload },
    @Body() comment: CreateCommentDto,
  ): Promise<CommentDto> {
    const data = await this.commentService.create(comment, req.user.id);
    return plainToInstance(CommentDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: CommentDto })
  async update(
    @Param('id') id: number,
    @Request() req: { user: JwtPayload },
    @Body() comment: CreateCommentDto,
  ): Promise<CommentDto> {
    const data = await this.commentService.update(id, req.user.id, comment);
    return plainToInstance(CommentDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(
    @Param('id') id: number,
    @Request() req: { user: JwtPayload },
  ): Promise<void> {
    await this.commentService.remove(id, req.user.id);
  }
}
