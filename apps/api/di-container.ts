import {Container} from "inversify";

import {UserService} from "./services/user.service";
import {UserRepository} from "./repositories/user.repository";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();