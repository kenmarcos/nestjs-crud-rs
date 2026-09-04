import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id ?? '',
        email: loginDto.email,
      }),
    };
  }
}
