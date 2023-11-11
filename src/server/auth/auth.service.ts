import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  signAccessToken() {
    return this.jwt.sign(
      { role: 'ADMIN' },
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
  }
  verifyAccessToken(token: string) {
    return this.jwt.verify(token);
  }
}
