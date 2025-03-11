import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Avatar URL of the user',
    type: String,
    required: false,
  })
  @IsOptional()
  avatar: string;
}
