import { Router } from "express"
import { EventoController } from "../controller/EventoController.js";
import authenticate from "../auth/authenticate.js";
import authorization from "../auth/authorization.js";

const routes = Router();

const eventoController = new EventoController();

routes.get("/eventos", authenticate, eventoController.findAllEventos);
routes.get("/evento/:id", eventoController.buscarEventoPorId);
routes.get("/eventos/search", eventoController.filterEvento);
routes.post('/evento', authorization, eventoController.createEvento);
routes.put("/eventos/:id", authorization, eventoController.updateEvento);
routes.delete("/eventos/:id", authorization, eventoController.deleteEvento);


// routes.get("/eventos", eventoController.findAllEventos);
// routes.get("/evento/:id", eventoController.buscarEventoPorId);
// routes.get("/eventos/search", eventoController.filterEvento);
// routes.post('/evento', eventoController.createEvento);
// routes.put("/eventos/:id", eventoController.updateEvento);
// routes.delete("/eventos/:id", eventoController.deleteEvento);

export { routes }
