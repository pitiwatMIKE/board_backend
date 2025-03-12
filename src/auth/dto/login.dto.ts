import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
