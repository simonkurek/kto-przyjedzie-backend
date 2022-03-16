import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ValidateUser } from './validators/user.validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const validtor = new ValidateUser(createUserDto, this.userRepository);
    const emailNotUsed: boolean = await validtor.validateEmail(createUserDto);
    if (!emailNotUsed) {
      return new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.save({
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name,
    });
    return ['Zarejestrowano pomyślnie'];
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
