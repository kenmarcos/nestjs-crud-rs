import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(User, ['id']) {
  @IsString()
  declare name: string;

  @IsEmail()
  declare email: string;
}
