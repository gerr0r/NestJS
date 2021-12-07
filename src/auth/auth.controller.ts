import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  private logger = new Logger(this.constructor.name);

  @Post('/register')
  register(@Body() dto: AuthUserDto): Promise<void> {
    return this.service.register(dto);
  }

  @Post('/login')
  async login(@Body() dto: AuthUserDto): Promise<{ token: string }> {
    try {
      const loginData = await this.service.login(dto);
      return loginData;
    } catch (e) {
      const {
        response: { statusCode: code, message, error }
      } = e;

      this.logger.warn(
        `Wrong credential login attempt! Username: ${dto.username}. \nError code: ${code} (${error}). Message sent: ${message}`
      );
      throw e;
    }
  }

  // remove later
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
