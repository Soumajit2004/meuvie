import {User} from "../../entites/user.entity";

export interface IUserRepository {
  create() : Promise<void>;
}