import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';
import * as bc from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(dto: AuthUserDto): Promise<void> {
    const { username, password } = dto;

    const salt = await bc.genSalt();
    const hash = await bc.hash(password, salt);

    const user = this.create({ username, password: hash });
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

  async loginUser(dto: AuthUserDto): Promise<string> {
    const { username, password } = dto;

    const user = await this.findOne({ username });
    const hash = await bc.compare(password, user?.password || '');

    if (user && hash) {
      return username;
    } else {
      throw new UnauthorizedException('Wrong username or password');
    }
  }
}
