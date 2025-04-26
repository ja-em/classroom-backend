import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, RefreshTokenInput } from 'types/input';
import { LoginObject } from 'types/object';
import { AuthenticationService } from './authentication.service';
import { IsPublic } from 'decorators/authorization';

@Resolver(() => LoginObject)
@IsPublic()
export class AuthenticationResolver {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Mutation(() => LoginObject)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginObject> {
    const { accessToken, refreshToken } = this._authenticationService.login(
      loginInput.username,
      loginInput.password,
    );
    return { accessToken, refreshToken };
  }

  @Mutation(() => LoginObject)
  async refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ): Promise<LoginObject> {
    const { accessToken, refreshToken } =
      this._authenticationService.refreshToken(refreshTokenInput.refreshToken);
    return { accessToken, refreshToken };
  }
}
