import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PostDto } from './post.dto';
import { Expose, Type } from 'class-transformer';
import { MetaDto } from 'src/dtos/meta.dto';

export class MyPostDto extends PaginationDto {}

export class MyPostResponseDto {
  @ApiProperty({ type: [PostDto] })
  @Expose()
  @Type(() => PostDto)
  data: PostDto[];

  @ApiProperty({ type: MetaDto })
  @Expose()
  @Type(() => MetaDto)
  meta: MetaDto;
}
