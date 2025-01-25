import {NextFunction, Request, Response} from 'express';
import {controller, httpGet, interfaces} from "inversify-express-utils";
import {UserService} from "../services/user.service";


@controller('/users')
export class UserController implements interfaces.Controller {

  private readonly _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  @httpGet('/')
  index(req: Request, res: Response, next: NextFunction) {
    res.send('Hello World');
  }
}