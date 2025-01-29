import { IUserRepository } from './interfaces/user-repository.interface';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> implements IUserRepository {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async createUser(): Promise<User> {
    return new User();
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.findOne({ where: { id: userId } });
  }
}