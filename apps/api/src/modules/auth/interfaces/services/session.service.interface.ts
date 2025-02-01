import { UserSession } from '../../user-session.entity';
import { SessionValidationResult } from '../../types/session-validation-result.type';

export abstract class ISessionService {
  abstract generateSessionToken(): string;

  abstract createSession(token: string, userName: string): Promise<UserSession>;

  abstract validateSessionToken(
    token: string,
  ): Promise<SessionValidationResult>;

  abstract invalidateSession(sessionId: string): Promise<void>;
}
