import {IUserRepository} from "./interfaces/user-repository.interface";
import {User} from "./user.entity";

export class UserRepository implements IUserRepository {
  async createUser(): Promise<User> {
    return new User();
  }
}