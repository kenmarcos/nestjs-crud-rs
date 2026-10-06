import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthenticatedRequest>(
    err: Error | null,
    user: TUser | false,
    info?: Error,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message);
    }

    return user;
  }
}
