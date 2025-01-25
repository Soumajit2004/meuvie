import {IUserRepository} from "../interfaces/repositories/user.repository.interface";

export class UserRepository implements IUserRepository {

  async create() {
    // create user
    console.log('User created');
  }
}