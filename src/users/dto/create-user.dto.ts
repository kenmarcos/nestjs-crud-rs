import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends OmitType(User, ['id']) {
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  declare password: string;
}
