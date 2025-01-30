import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository } from './interfaces/user-repository.interface';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';


export class UserRepository implements IUserRepository {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, fullName } = createUserDto;

    const user = this.userRepository.create({
      username: username,
      password: password,
      fullName: fullName,
    });

    return this.userRepository.save(user);
  }

  async findUserByUsername(userName: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username: userName } });
  }
}