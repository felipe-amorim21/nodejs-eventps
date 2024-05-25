import { Router } from "express";
import { LocalController } from "../controller/LocalController.js";
import authenticate from "../auth/authenticate.js";
import authorization from "../auth/authorization.js";

const routes = Router();
const localController = new LocalController();

routes.get("/locais", authenticate, localController.findAllLocais.bind(localController));
routes.get("/local/:id", authenticate, localController.buscarLocalPorId.bind(localController));
routes.post("/local", authorization, localController.createLocal.bind(localController));
routes.put("/local/:id", authorization, localController.updateLocal.bind(localController));
routes.delete("/local/:id", authorization, localController.deleteLocal.bind(localController));

export { routes };