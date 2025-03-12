import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';
import { Expose, Type } from 'class-transformer';

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

export class CreateUserResponse {
  @ApiProperty({ type: String })
  @Expose()
  token: string;

  @ApiProperty({ type: UserDto })
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
