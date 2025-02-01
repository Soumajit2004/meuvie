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
    AuthService,
    SessionService,
    UserSessionRepository,
    CookieStrategy,
  ],
})
export class AuthModule {}
