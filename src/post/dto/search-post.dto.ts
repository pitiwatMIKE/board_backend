import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { MetaDto } from 'src/dtos/meta.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class SearchPostDto extends PaginationDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  userId?: number;
}

export class SearchPostResponseDto {
  @ApiProperty({ type: [PostDto] })
  @Expose()
  @Type(() => PostDto)
  data: PostDto[];

  @ApiProperty({ type: MetaDto })
  @Expose()
  @Type(() => MetaDto)
  meta: MetaDto;
}
