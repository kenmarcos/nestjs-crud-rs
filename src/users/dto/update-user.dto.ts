import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  declare name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  declare email?: string;
}
