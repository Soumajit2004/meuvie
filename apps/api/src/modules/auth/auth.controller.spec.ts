import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { IAuthService } from './interfaces/services/auth.service.interface';
import { AuthService } from './services/auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserModule } from '../user/user.module';
import { ISessionService } from './interfaces/services/session.service.interface';
import { SessionService } from './services/session/session.service';
import { IUserSessionRepository } from './interfaces/repositories/user-session.repository.interface';
import { UserSessionRepository } from './user-session.repository';

describe('AuthController', () => {
  // let controller: AuthController;
  // let authService: IAuthService;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [UserModule],
  //     controllers: [AuthController],
  //     providers: [
  //       {
  //         provide: IAuthService,
  //         useClass: AuthService,
  //       },
  //       {
  //         provide: ISessionService,
  //         useClass: SessionService,
  //       },
  //       {
  //         provide: IUserSessionRepository,
  //         useClass: UserSessionRepository,
  //       },
  //     ],
  //   }).compile();
  //
  //   controller = module.get<AuthController>(AuthController);
  // });
  //
  // // it('should return CSRF token', () => {
  // //   const request: Request = {};
  // //
  // //   expect(controller.csrfToken(request)).toEqual({
  // //     csrfToken: 'test-csrf-token',
  // //   });
  // // });
  //
  // it('should sign up a user', async () => {
  //   const createUserDto: CreateUserDto = {
  //     fullName: 'test',
  //     username: 'test',
  //     password: 'test',
  //   };
  //
  //   await controller.signUp(createUserDto);
  //   expect(authService.signUp).toHaveBeenCalledWith(createUserDto);
  // });
});
