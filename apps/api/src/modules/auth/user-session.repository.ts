import { Repository } from 'typeorm';
import { UserSession } from './user-session.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserSessionRepository extends Repository<UserSession> {
  constructor(
    @InjectRepository(UserSession) private userSessionRepository: Repository<UserSession>,
  ) {
    super(userSessionRepository.target, userSessionRepository.manager, userSessionRepository.queryRunner);
  }

  async createSession(sessionId: string, userId: string, expiresAt: Date): Promise<UserSession> {
    const session = new UserSession();
    session.id = sessionId;
    session.userId = userId;
    session.expiresAt = expiresAt;

    return this.save(session);
  }
}