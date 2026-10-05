import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { EnvService } from '../env/env.service';

interface UserJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('SECRET_KEY'),
    });
  }

  validate(payload: UserJwtPayload) {
    // Montar o objeto que vai para o req.user
    return { id: payload.sub, email: payload.email };
  }
}
