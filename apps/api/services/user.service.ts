import {injectable} from "inversify";

import logger from "../logger";
import {IUserRepository} from "../interfaces/repositories/user.repository.interface";

@injectable()
export class UserService {

  // private readonly _userRepository: IUserRepository;
  //
  // constructor(userRepository: IUserRepository) {
  //   this._userRepository = userRepository;
  // }

  async registerUser(fullName: string, email: string, password: string): Promise<void> {
    logger.info(`[UserService] Registering user with email: ${email}`);
  }
}