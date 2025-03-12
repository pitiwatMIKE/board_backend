import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { plainToInstance } from 'class-transformer';
import { SearchPostDto, SearchPostResponseDto } from './dto/search-post.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 200, type: SearchPostResponseDto })
  async searchPosts(
    @Query() query: SearchPostDto,
  ): Promise<SearchPostResponseDto> {
    return this.postService.searchPosts(query);
  }

  @Get()
  @ApiResponse({ status: 200, type: [PostDto] })
  async findAll(): Promise<PostDto[]> {
    const posts = await this.postService.findAll();
    return plainToInstance(PostDto, posts, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: PostDto })
  async findOne(@Param('id') id: number): Promise<PostDto> {
    const post = await this.postService.findOne(id);
    return plainToInstance(PostDto, post, { excludeExtraneousValues: true });
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: PostDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() post: CreatePostDto,
    @Request() request: { user: JwtPayload },
  ): Promise<PostDto> {
    const data = await this.postService.create(post, request.user);
    return plainToInstance(PostDto, data, { excludeExtraneousValues: true });
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    type: PostDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() post: UpdatePostDto,
    @Request() request: { user: JwtPayload },
  ): Promise<PostDto> {
    const data = await this.postService.update(id, request.user.id, post);
    return plainToInstance(PostDto, data, { excludeExtraneousValues: true });
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
    return this.postService.remove(id, req.user.id);
  }
}
