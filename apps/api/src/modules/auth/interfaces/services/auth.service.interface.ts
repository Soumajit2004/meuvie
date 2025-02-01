import { SignInUserDto } from '../../dto/request/signin-user.dto';
import { UserSession } from '../../user-session.entity';
import { CreateUserDto } from '../../../user/dto/create-user.dto';

export abstract class IAuthService {
  abstract signUp(createUserDto: CreateUserDto): Promise<void>;

  abstract signIn(signInUserDto: SignInUserDto): Promise<UserSession>;

  abstract signOut(sessionId: string): Promise<void>;
}
