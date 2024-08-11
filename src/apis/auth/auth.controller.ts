import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Response } from 'express';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    console.log('요청');
    const { email, password } = loginDto;

    const tokens = await this.authService.login(email, password);

    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

    return res.json(tokens);
  }

  // 꼭 가드가 HTTP 요청 메서드 위에 위치해야 합니다.
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: RequestWithUser) {
    const user = req.user;

    return user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async generateNewAccessToken(
    @Request() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const refreshToken = req.user['refreshToken'];

    const accessToken =
      await this.authService.generateNewAccessToken(refreshToken);
    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.json(accessToken);
  }
}
