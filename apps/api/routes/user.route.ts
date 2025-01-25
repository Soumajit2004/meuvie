import {UserController} from "../controllers/user.controller";
import express from "express";
import {UserRepository} from "../repositories/user.repository";
import {UserService} from "../services/user.service";
import {Container} from "inversify";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

const container = new Container()

const router = express.Router();

router.post('/register', controller.onRegisterUser.bind(controller));

export default router;