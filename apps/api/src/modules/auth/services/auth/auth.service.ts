import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../../user/user.repository';
import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { SessionService } from '../session/session.service';
import { SignInUserDto } from '../../dto/request/signin-user.dto';
import { UserSession } from '../../user-session.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    this.logger.verbose(`user ${createUserDto.username} has been created`);
  }

  async signIn(signInUserDto: SignInUserDto): Promise<UserSession> {
    const { username, password } = signInUserDto;

    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.sessionService.generateSessionToken();
    const session = await this.sessionService.createSession(token, username);

    this.logger.verbose(`user ${username} has been signed in`);
    return session;
  }

  async signOut(token: string): Promise<void> {
    await this.sessionService.invalidateSession(token);
    this.logger.verbose(`session ${token} has been invalidated`);
  }
}
