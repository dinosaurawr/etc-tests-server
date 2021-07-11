import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';

export interface JwtPayload {
  login: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findByLogin(payload.login);
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
