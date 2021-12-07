import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private repository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async register(dto: AuthUserDto): Promise<void> {
    return this.repository.createUser(dto);
  }

  async login(dto: AuthUserDto): Promise<{ token: string }> {
    try {
      const username = await this.repository.loginUser(dto);
      const token = await this.jwtService.sign({ username });
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
