import {Application} from "./index";

import "./controllers/user.controller";

function bootstrap() {

  new Application().setup();

  return {};
}

bootstrap()