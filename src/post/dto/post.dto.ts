import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Content of the post' })
  @IsString()
  content: string;
}

export class UpdatePostDto {
  @ApiProperty({ description: 'Title of the post', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Content of the post', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}

export class PostDto {
  @ApiProperty({ description: 'ID of the post' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Content of the post' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Date when post was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when post was last updated' })
  updatedAt: Date;
}

export class PaginationMetaDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

export class PaginationResponseDto<T> {
  @ApiProperty({ type: [PostDto] })
  data: T[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
