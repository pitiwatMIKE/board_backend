import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MetaDto {
  @ApiProperty({ example: 4 })
  @Expose()
  totalRecord: number;

  @ApiProperty({ example: 3 })
  @Expose()
  currentPage: number;

  @ApiProperty({ example: 4 })
  @Expose()
  totalPage: number;
}
