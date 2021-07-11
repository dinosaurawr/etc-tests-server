import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { AuthService, LoginResult } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResult> {
    return this.authService.getJWT(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req): Promise<User> {
    return req.user;
  }
}
