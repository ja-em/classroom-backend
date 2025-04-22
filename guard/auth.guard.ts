import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthenticationService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext()?.req;
    console.log('Request:', req);
    console.log('AC', this._authService.generateAccessToken());

    // You can implement JWT validation or session check here
    return true;
  }
}
