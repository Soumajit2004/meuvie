import { IUserRepository } from './interfaces/user-repository.interface';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository extends Repository<User> implements IUserRepository {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    const user = this.create({
      username: username,
    });

    return this.save(user);
  }

  async findUserByUsername(userName: string): Promise<User | null> {
    return this.findOne({ where: { username: userName } });
  }
}