import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { plainToInstance } from 'class-transformer';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserDto })
  async findOne(
    @Param('id') id: number,
    @Request() req: { user: JwtPayload },
  ): Promise<UserDto> {
    if (req?.user?.id !== Number(id)) {
      throw new ForbiddenException('Forbidden');
    }
    const user = await this.userService.findOne(id);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
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
    status: 204,
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
