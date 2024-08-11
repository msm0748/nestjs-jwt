import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // This is a mock user data.
    const user = {
      id: 1,
      email: 'msm0748@gmail.com',
      password: '1234',
      name: 'seokmin',
      role: 0,
      provider: 'local',
    };

    if (email !== user.email || password !== user.password) {
      return null;
    }

    const payload: JwtPayload = user;

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '10m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '14d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateNewAccessToken(refreshToken: string) {
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const payload: JwtPayload = {
      name: decoded.name,
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
      provider: decoded.provider,
    };

    const newAccessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30s',
    });

    return {
      accessToken: newAccessToken,
    };
  }
}
