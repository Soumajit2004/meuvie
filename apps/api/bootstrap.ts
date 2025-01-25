import {Application} from "./index";

import "./controllers/user.controller";

console.clear()

function bootstrap() {

  new Application().setup();

  return {};
}

bootstrap()