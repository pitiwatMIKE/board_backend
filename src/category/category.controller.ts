import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { plainToInstance } from 'class-transformer';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse({ status: 200, type: [CategoryDto] })
  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.findAll();
    return plainToInstance(CategoryDto, categories, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: CategoryDto })
  async findOne(@Param('id') id: number): Promise<CategoryDto> {
    const category = await this.categoryService.findOne(id);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: CategoryDto,
  })
  async create(@Body() category: CreateCategoryDto): Promise<CategoryDto> {
    const data = await this.categoryService.create(category);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  async update(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const data = await this.categoryService.update(id, category);
    return plainToInstance(CategoryDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
