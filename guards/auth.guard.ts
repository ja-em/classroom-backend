import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from 'decorators/authorization';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
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
