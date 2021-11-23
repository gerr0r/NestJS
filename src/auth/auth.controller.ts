import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/register')
  register(@Body() dto: AuthUserDto): Promise<void> {
    return this.service.register(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthUserDto): Promise<string> {
    return this.service.login(dto);
  }
}
