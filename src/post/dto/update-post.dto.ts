import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    type: String,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Content of the post',
    type: String,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'Category id of the post',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
