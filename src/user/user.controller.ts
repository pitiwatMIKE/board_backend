import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {  ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
