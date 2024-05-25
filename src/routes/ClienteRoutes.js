import { Router } from "express";

import { ClienteController } from "../controller/ClienteController.js";
import authorization from "../auth/authorization.js";
import authenticate from "../auth/authenticate.js";

const clienteController = new ClienteController();

const routes = Router();


routes.get('/clientes', clienteController.findAllClients);
routes.post('/cliente',  clienteController.createCliente);
routes.put('/cliente/:id', clienteController.updateCliente);
routes.delete('/cliente/:id', authorization, clienteController.deleteCliente);

export { routes }