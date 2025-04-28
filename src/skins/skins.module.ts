import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinsService } from './skins.service';
import { SkinsController } from './skins.controller';
import { Skin } from './entities/skin.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skin, User])],
  controllers: [SkinsController],
  providers: [SkinsService],
})
export class SkinsModule {}