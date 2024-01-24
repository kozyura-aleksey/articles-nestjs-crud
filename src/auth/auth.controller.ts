import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  async singIn(@Body() dto: CreateUserDto) {
    const token = await this.authService.singIn(dto);
    return token;
  }

  @Post('login')
  async loginUser(@Body() dto: CreateUserDto) {
    const token = await this.authService.loginUser(dto);
    return token;
  }
}
