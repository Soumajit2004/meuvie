import {IUserRepository} from "../interfaces/repositories/user.repository.interface";
import {injectable} from "inversify";

@injectable()
export class UserRepository implements IUserRepository {

  async create() {
    // create user
    console.log('User created');
  }
}