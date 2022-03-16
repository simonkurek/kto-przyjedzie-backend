import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export class ValidateUser {
  constructor(
    private userDto: CreateUserDto,
    private userRepository: Repository<User>,
  ) {}

  async validateEmail(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new HttpException(
        {
          message: ['Ten email jest już zajęty'],
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return true;
  }
}
