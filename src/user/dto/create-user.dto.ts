import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Avatar URL of the user',
    type: String,
    required: false,
  })
  @IsOptional()
  avatar: string;
}
