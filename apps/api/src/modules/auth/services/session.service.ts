import { Injectable } from '@nestjs/common';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';

import { UserSession } from '../user-session.entity';
import { User } from '../../user/user.entity';
import { UserSessionRepository } from '../user-session.repository';
import { sha256 } from '@oslojs/crypto/dist/sha2';

export type SessionValidationResult =
  | { session: UserSession; user: User }
  | { session: null; user: null };


@Injectable()
export class SessionService {

  constructor(private readonly userSessionRepository: UserSessionRepository) {
  }

  generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    return encodeBase32LowerCaseNoPadding(bytes);
  }

  async createSession(token: string, userId: number): Promise<UserSession> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    return this.userSessionRepository.createSession(
      sessionId,
      userId.toString(),
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    );
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    // TODO
  }

  async invalidateSession(sessionId: string): Promise<void> {
    // TODO
  }

}