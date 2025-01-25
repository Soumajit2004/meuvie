import logger from "../logger";
import {IUserRepository} from "../interfaces/repositories/user.repository.interface";
import {injectable} from "inversify";

@injectable()
export class UserService {

  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(fullName: string, email: string, password: string): Promise<void> {
    logger.info(`[UserService] Registering user with email: ${email}`);
  }
}