import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { IUserRepository } from './interfaces/user-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [{ provide: IUserRepository, useClass: UserRepository }],
})
export class UserModule {}
