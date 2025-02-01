import { UserSession } from '../../user-session.entity';
import { User } from '../../../user/user.entity';

export abstract class IUserSessionRepository {
  abstract createSession(
    sessionId: string,
    user: User,
    expiresAt: Date,
  ): Promise<UserSession>;

  abstract deleteSession(sessionId: string): Promise<void>;

  abstract findUserSessionById(sessionId: string): Promise<UserSession | null>;

  abstract updateSession(session: any): Promise<UserSession>;
}
