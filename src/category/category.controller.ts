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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse({ status: 200, type: [CategoryDto] })
  async findAll(): Promise<CategoryDto[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: CategoryDto })
  async findOne(@Param('id') id: number): Promise<CategoryDto> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: CategoryDto,
  })
  async create(@Body() category: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.create(category);
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
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
