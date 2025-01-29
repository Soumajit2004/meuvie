import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserSession } from './user-session.entity';
import { UserSessionRepository } from './user-session.repository';
import { SessionService } from './services/session.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSession]),
    PassportModule.register({
      session: true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionService, UserSessionRepository],
})
export class AuthModule {
}
