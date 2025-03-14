import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CategoryDto } from 'src/category/dto/category.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class PostDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  commentCount: number;

  @ApiProperty({ type: () => CategoryDto })
  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @ApiProperty({ type: UserDto })
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
