import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(dto: AuthUserDto): Promise<void> {
    const { username, password } = dto;

    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code == 23505) {
        // username exists
        throw new ConflictException('Username exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
