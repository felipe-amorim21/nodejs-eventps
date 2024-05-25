import { Router } from "express";

import CategoriaController from "../controller/CategoriasController.js";
import authorization from "../auth/authorization.js";
import authenticate from "../auth/authenticate.js";



const routers = Router();

// rotas categorias
routers.get('/categorias', authenticate, CategoriaController.listarCategorias);
routers.get('/categoria/:id', authenticate, CategoriaController.buscarCategoriaPorId);
routers.post('/categoria', authorization, CategoriaController.criarCategoria);
routers.put('/categoria/:id', authorization, CategoriaController.atualizarCategoria);
routers.delete('/categoria/:id', authorization, CategoriaController.deletarCategoria);


// routers.get('/categorias', CategoriaController.listarCategorias);
// routers.get('/categoria/:id', CategoriaController.buscarCategoriaPorId);
// routers.post('/categoria', CategoriaController.criarCategoria);
// routers.put('/categoria/:id', CategoriaController.atualizarCategoria);
// routers.delete('/categoria/:id', CategoriaController.deletarCategoria);

export { routers }