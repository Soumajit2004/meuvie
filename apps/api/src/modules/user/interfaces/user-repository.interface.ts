import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class IUserRepository {
  abstract createUser(createUserDto: CreateUserDto): Promise<User>;

  abstract findUserByUsername(userName: string): Promise<User | null>;
}
