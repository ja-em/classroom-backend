import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthenticationService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const headers = ctx.getContext()?.req?.headers;
    if (!headers) {
      return false;
    }

    const accessToken = headers['authorization']?.split(' ')[1];
    if (!accessToken) {
      return false;
    }

    return this._authService.verfiyAccessToken(accessToken);
  }
}
