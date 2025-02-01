import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';

import { UserSessionRepository } from '../../user-session.repository';
import { UserRepository } from '../../../user/user.repository';
import { UserSession } from '../../user-session.entity';
import { SessionValidationResult } from '../../types/session-validation-result.type';

@Injectable()
export class SessionService {
  constructor(
    private readonly userSessionRepository: UserSessionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  generateSessionToken(): string {
    return crypto.randomUUID();
  }

  async createSession(token: string, userName: string): Promise<UserSession> {
    const sessionId = token;

    const user = await this.userRepository.findUserByUsername(userName);

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
    const sessionId = token;

    const userSession =
      await this.userSessionRepository.findUserSessionById(sessionId);

    if (userSession === null) {
      return { session: null, user: null };
    }

    if (Date.now() >= userSession.expiresAt.getTime()) {
      await this.userSessionRepository.deleteSession(sessionId);
      return { session: null, user: null };
    }

    if (
      Date.now() >=
      userSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
    ) {
      userSession.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await this.userSessionRepository.updateSession(userSession);
    }
    return { session: userSession, user: userSession.user };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.userSessionRepository.deleteSession(sessionId);
  }
}
