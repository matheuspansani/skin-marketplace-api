import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  nick?: string;

  @IsOptional()
  @IsNumber()
  saldo?: number;

  @IsOptional()
  @IsString()
  steamId?: string;
}