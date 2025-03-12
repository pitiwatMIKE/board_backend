import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    type: String,
  })
  @IsOptional()
  @IsString()
  content?: string;
}
