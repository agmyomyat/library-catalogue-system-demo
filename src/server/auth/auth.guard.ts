import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // Retrieve the authorization token from the request headers
    const token = request.headers.authorization;

    // If no token is present, throw a ForbiddenException
    if (!token) throw new ForbiddenException();

    // Try to verify the authenticity of the access token using the authentication service
    try {
      this.auth.verifyAccessToken(token);
      // If verification succeeds, return true
      return true;
    } catch (e) {
      // If verification fails, throw a ForbiddenException
      throw new ForbiddenException();
    }
  }
}
