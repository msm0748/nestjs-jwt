import { Request } from 'express';

declare global {
  // JWT 토큰 페이로드 정의
  type JwtPayload = {
    email: string;
    id: number;
    name: string;
    role: number;
    provider: string;
  };

  // Request 객체에 user 속성을 추가
  interface RequestWithUser extends Request {
    user: JwtPayload;
  }
}
