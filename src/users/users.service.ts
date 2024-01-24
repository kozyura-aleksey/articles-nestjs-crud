import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(email: string): Promise<IUser> {
    const user: IUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async saveUser(dto: CreateUserDto): Promise<IUser> {
    try {
      await this.userRepository.save({
        ...dto,
      });
      return this.findUser(dto.email);
    } catch {
      throw new BadRequestException('Не удалось сохранить пользователя в БД');
    }
  }
}
