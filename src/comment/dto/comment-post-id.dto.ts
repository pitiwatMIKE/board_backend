import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { CommentDto } from './comment.dto';
import { MetaDto } from 'src/dtos/meta.dto';

export class CommentPostIdDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postId: number;
}

export class CommentPostIdResponseDto {
  @ApiProperty({ type: [CommentDto] })
  @Expose()
  @Type(() => CommentDto)
  data: CommentDto[];

  @ApiProperty({ type: MetaDto })
  @Expose()
  @Type(() => MetaDto)
  meta: MetaDto;
}
