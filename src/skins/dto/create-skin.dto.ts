import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSkinDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsOptional()
  @IsNumber()
  donoId?: number;
}