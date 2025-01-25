import {Container} from "inversify";

import {UserService} from "./services/user.service";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(UserService).toSelf();