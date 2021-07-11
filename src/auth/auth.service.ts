import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { User } from 'src/users/user.model';

export interface ApiResponse<TResult, TError> {
  response?: TResult;
  error?: TError;
  success: boolean;
}

export interface LoginResult {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userService.findByLogin(login);
    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async getJWT(user: User): Promise<LoginResult> {
    const payload: JwtPayload = { login: user.login };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
