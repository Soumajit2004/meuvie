import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserSession } from './user-session.entity';
import { User } from '../user/user.entity';

@Injectable()
export class UserSessionRepository {
  constructor(
    @InjectRepository(UserSession)
    private userSessionRepository: Repository<UserSession>,
  ) {}

  async createSession(
    sessionId: string,
    user: User,
    expiresAt: Date,
  ): Promise<UserSession> {
    const previousSession = await this.userSessionRepository.findOneBy({
      user: user,
    });

    if (previousSession) {
      await this.deleteSession(previousSession.id);
    }

    const session = new UserSession();

    session.id = sessionId;
    session.user = user;
    session.expiresAt = expiresAt;

    return this.userSessionRepository.save(session);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.userSessionRepository.delete(sessionId);
  }

  async findUserSessionById(sessionId: string): Promise<UserSession | null> {
    return this.userSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'],
    });
  }

  async updateSession(session: UserSession): Promise<UserSession> {
    return this.userSessionRepository.save(session);
  }
}
