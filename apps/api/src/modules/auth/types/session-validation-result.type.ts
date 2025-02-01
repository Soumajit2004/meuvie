import { UserSession } from '../user-session.entity';
import { User } from '../../user/user.entity';

export type SessionValidationResult =
  | { session: UserSession; user: User }
  | { session: null; user: null };
