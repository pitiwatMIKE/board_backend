import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
}
