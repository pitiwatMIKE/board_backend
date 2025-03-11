import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from 'src/entities/Post.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: PostDto,
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the post' })
  async findOne(@Param('id') id: number): Promise<PostDto> {
    return this.postService.findOne(id);
  }
}
