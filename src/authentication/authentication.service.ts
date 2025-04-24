import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  private readonly _accessTokenExpiration: number = 3600 * 8; // 8 hours
  private readonly _refreshTokenExpiration: number = 604800; // 7 days
  private readonly _accessTokenSecret: string = 'top_secret';
  private readonly _refreshTokenSecret: string = 'top_secret';
  constructor(private readonly _config: ConfigService) {
    this._accessTokenSecret =
      this._config.get<string>('ACCESS_TOKEN_SECRET') ?? 'top_secret';
    this._refreshTokenSecret =
      this._config.get<string>('REFRESH_TOKEN_SECRET') ?? 'top_secret';
  }

  login(
    username: string,
    password: string,
  ): { accessToken: string; refreshToken: string } {
    if (username !== 'admin' && password !== 'password') {
      throw new BadRequestException('Invalid credentials');
    }
    return {
      accessToken: this._generateAccessToken(username),
      refreshToken: this._generateRefreshToken(username),
    };
  }

  refreshToken(refreshToken: string): {
    accessToken: string;
    refreshToken: string;
  } {
    try {
      const data = jwt.verify(refreshToken, this._refreshTokenSecret) as {
        username: string;
      };

      return {
        accessToken: this._generateAccessToken(data.username),
        refreshToken: this._generateRefreshToken(data.username),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private _generateAccessToken(username: string): string {
    const accessToken = jwt.sign({ username }, this._accessTokenSecret, {
      expiresIn: this._accessTokenExpiration,
    });
    return accessToken;
  }

  private _generateRefreshToken(username: string): string {
    const accessToken = jwt.sign({ username }, this._refreshTokenSecret, {
      expiresIn: this._refreshTokenExpiration,
    });
    return accessToken;
  }
}
