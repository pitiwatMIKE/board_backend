import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: '10', type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({ example: '1', type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: 'createdAt',
    enum: ['createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt'])
  sort: 'createdAt' | 'updatedAt' = 'createdAt';

  @ApiPropertyOptional({
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC' = 'DESC';
}
