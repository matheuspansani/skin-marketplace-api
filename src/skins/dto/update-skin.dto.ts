import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinDto } from './create-skin.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSkinDto extends PartialType(CreateSkinDto) {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsNumber()
  donoId?: number;
}