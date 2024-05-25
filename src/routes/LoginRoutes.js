import { Router } from "express"
import { LoginController } from "../controller/LoginController.js";

const routes = Router();

const loginController = new LoginController()

routes.post("/login", loginController.login);

export { routes }