import { Injectable, NotFoundException } from '@nestjs/common';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';

import { UserSession } from '../user-session.entity';
import { User } from '../../user/user.entity';
import { UserSessionRepository } from '../user-session.repository';
import { sha256 } from '@oslojs/crypto/dist/sha2';
import { UserRepository } from '../../user/user.repository';

export type SessionValidationResult =
  | { session: UserSession; user: User }
  | { session: null; user: null };


@Injectable()
export class SessionService {

  constructor(private readonly userSessionRepository: UserSessionRepository, private readonly userRepository: UserRepository) {
  }

  generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    return encodeBase32LowerCaseNoPadding(bytes);
  }

  async createSession(token: string, userId: string): Promise<UserSession> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return this.userSessionRepository.createSession(
      sessionId,
      user,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    );
  }

  async validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

    const userSession = await this.userSessionRepository.findUserSessionById(sessionId);

    if (userSession === null) {
      return { session: null, user: null };
    }

    if (Date.now() >= userSession.expiresAt.getTime()) {
      await this.userSessionRepository.deleteSession(sessionId);
      return { session: null, user: null };
    }

    if (Date.now() >= userSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      userSession.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await this.userSessionRepository.updateSession(userSession);
    }
    return { session: userSession, user: userSession.user };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.userSessionRepository.deleteSession(sessionId);
  }

}