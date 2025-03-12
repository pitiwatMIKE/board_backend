import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(entities))],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
