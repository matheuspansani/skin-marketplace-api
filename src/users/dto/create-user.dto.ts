import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nick: string;

  @IsOptional()
  @IsNumber()
  saldo?: number;

  @IsOptional()
  @IsString()
  steamId?: string;
}