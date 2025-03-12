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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto, CreateUserResponse } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.findOne(id);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: CreateUserResponse,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(CreateUserResponse, user, {
      excludeExtraneousValues: true,
    });
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
    const user = await this.userService.update(id, updateUserDto);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
