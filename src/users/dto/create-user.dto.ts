import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(User, ['id']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  declare password: string;
}
