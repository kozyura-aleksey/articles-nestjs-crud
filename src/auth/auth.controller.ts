import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  @ApiOperation({ summary: 'Sing in' })
  @ApiResponse({ status: 200 })
  async singIn(@Body() dto: CreateUserDto) {
    const token = await this.authService.singIn(dto);
    return token;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async loginUser(@Body() dto: LoginUserDto) {
    const token = await this.authService.loginUser(dto);
    return token;
  }
}
