import { EntityRepository, Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(dto: AuthUserDto): Promise<void> {
    const { username, password } = dto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
