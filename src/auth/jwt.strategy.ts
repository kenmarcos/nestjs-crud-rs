import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { PassportStrategy } from '@nestjs/passport';

interface UserJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY as string,
    });
  }

  validate(payload: UserJwtPayload) {
    // Montar o objeto que vai para o req.user
    return { id: payload.sub, email: payload.email };
  }
}
