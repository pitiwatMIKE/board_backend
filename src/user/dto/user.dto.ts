import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
