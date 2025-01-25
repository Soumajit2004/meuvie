import {User} from "../user.entity";

export interface IUserRepository {
  createUser(): Promise<User>;
}