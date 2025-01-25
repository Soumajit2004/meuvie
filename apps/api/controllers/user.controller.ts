import {NextFunction, Request, Response} from 'express';
import {controller, httpGet, interfaces} from "inversify-express-utils";


@controller('/users')
export class UserController implements interfaces.Controller {

  @httpGet('/')
  index(req: Request, res: Response, next: NextFunction) {
    res.send('Hello World');
  }
}