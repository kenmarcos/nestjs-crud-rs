import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class User {
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
