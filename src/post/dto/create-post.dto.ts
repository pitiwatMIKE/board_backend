import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content of the post',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Category id of the post',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
