import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { MetaDto } from 'src/dtos/meta.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class SearchPostDto extends PaginationDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  search?: string;
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
