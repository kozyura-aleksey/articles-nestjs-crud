import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { LoginUserDto } from 'src/users/dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  private async generateToken(
    user_id: number,
    email: string,
  ): Promise<{ token: string }> {
    const token = this.jwtService.sign(
      { id: user_id, email },
      {
        secret: process.env.JWT_SECRET || 'secret',
      },
    );
    return {
      token,
    };
  }

  async singIn(dto: CreateUserDto): Promise<Record<string, string>> {
    const user: IUser = await this.usersService.findUser(dto.email);
    if (user) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    let userFind: IUser = await this.usersService.saveUser({
      ...dto,
      password: hashPassword,
    });
    let token = await this.generateToken(userFind.id, userFind.email);
    return token;
  }

  async loginUser(dto: LoginUserDto): Promise<Record<string, string>> {
    const user: IUser = await this.validateUser(dto);
    let token: Record<string, string>;
    if (user) {
      token = await this.generateToken(user.id, user.email);
    }
    return token;
  }

  async validateUser(dto: LoginUserDto) {
    const user: IUser = await this.usersService.findUser(dto.email);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    const passwordEqual: boolean = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (user && passwordEqual) {
      return user;
    }
    throw new HttpException(
      'Пользователь с таким email и паролем не найден',
      HttpStatus.NOT_FOUND,
    );
  }
}
