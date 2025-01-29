import { Repository } from 'typeorm';
import { UserSession } from './user-session.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserSessionRepository extends Repository<UserSession> {
  constructor(
    @InjectRepository(UserSession) private userSessionRepository: Repository<UserSession>,
  ) {
    super(userSessionRepository.target, userSessionRepository.manager, userSessionRepository.queryRunner);
  }

  async createSession(sessionId: string, user: User, expiresAt: Date): Promise<UserSession> {
    const session = new UserSession();

    session.id = sessionId;
    session.user = user;
    session.expiresAt = expiresAt;

    return this.save(session);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.delete(sessionId);
  }

  async findUserSessionById(sessionId: string): Promise<UserSession | null> {
    return this.findOne({ where: { id: sessionId }, relations: ['user'] });
  }

  async updateSession(session: UserSession): Promise<UserSession> {
    return this.save(session);
  }
}