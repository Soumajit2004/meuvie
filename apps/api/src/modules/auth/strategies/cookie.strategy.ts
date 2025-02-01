import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { SessionService } from '../services/session/session.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionValidationResult } from '../types/session-validation-result.type';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private readonly sessionService: SessionService) {
    super({
      cookieName: 'session',
    });
  }

  async validate(token: string): Promise<SessionValidationResult> {
    const sessionValidation =
      await this.sessionService.validateSessionToken(token);

    if (!sessionValidation.session || !sessionValidation.user) {
      throw new UnauthorizedException();
    }

    return sessionValidation;
  }
}
