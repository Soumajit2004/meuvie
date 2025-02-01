import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  createUser(createUserDto: CreateUserDto): Promise<User>;
}
