import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SkinsModule } from './skins/skins.module';
import { User } from './users/entities/user.entity';
import { Skin } from './skins/entities/skin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user',
      password: 'password',
      database: 'skins_marketplace',
      entities: [User, Skin],
      synchronize: true, 
    }),
    UsersModule,
    SkinsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}