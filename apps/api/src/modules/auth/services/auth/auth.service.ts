import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../user/user.repository';
import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { SessionService } from '../session/session.service';
import { SignInUserDto } from '../../dto/signin-user.dto';
import { UserSession } from '../../user-session.entity';

@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UserRepository, private readonly sessionService: SessionService) {
  }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.createUser(createUserDto);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<UserSession> {
    const { username } = signInUserDto;

    const token = this.sessionService.generateSessionToken();
    return this.sessionService.createSession(token, username);
  }
}
