import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { ...result } = user;
    return result;
  }

  async login(user: LoginDto) {
    const userData = await this.validateUser(user.username);

    const payload: JwtPayload = {
      id: userData.id,
      username: userData.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
