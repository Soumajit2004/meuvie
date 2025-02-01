import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth/auth.service';
import { AuthController } from './auth.controller';
import { UserSession } from './user-session.entity';
import { UserSessionRepository } from './user-session.repository';
import { UserModule } from '../user/user.module';
import { SessionService } from './services/session/session.service';
import { CookieStrategy } from './strategies/cookie.strategy';
import { IUserSessionRepository } from './interfaces/repositories/user-session.repository.interface';
import { ISessionService } from './interfaces/services/session.service.interface';
import { IAuthService } from './interfaces/services/auth.service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSession]),
    PassportModule.register({
      defaultStrategy: 'cookie',
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: IAuthService, useClass: AuthService },
    { provide: ISessionService, useClass: SessionService },
    { provide: IUserSessionRepository, useClass: UserSessionRepository },
    CookieStrategy,
  ],
})
export class AuthModule {}
