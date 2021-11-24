import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  login(@Body() dto: AuthUserDto): Promise<{ token: string }> {
    return this.service.login(dto);
  }

  // remove later
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
