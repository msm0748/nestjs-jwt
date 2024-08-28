import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './apis/auth/auth.service';
import { AuthController } from './apis/auth/auth.controller';
import { AuthModule } from './apis/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BoardsService } from './apis/boards/boards.service';
import { BoardsController } from './apis/boards/boards.controller';
import { BoardsModule } from './apis/boards/boards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 환경 변수를 글로벌로 설정
    }),
    AuthModule,
    BoardsModule,
  ],
  controllers: [AppController, AuthController, BoardsController],
  providers: [AppService, AuthService, JwtService, BoardsService],
})
export class AppModule {}
