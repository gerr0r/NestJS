import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private repository: UsersRepository
  ) {}

  async register(dto: AuthUserDto): Promise<void> {
    return this.repository.createUser(dto);
  }
}
