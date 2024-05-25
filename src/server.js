
import express from "express";
import { routes as localRoutes } from "./routes/LocalRoutes.js";
import { routers as categoriasRoutes } from "./routes/categoriaRoutes.js";
import { routes as clienteRoutes } from "./routes/ClienteRoutes.js"
import { routes as eventoRoutes } from "./routes/EventoRoutes.js";
import { routes as loginRoutes } from "./routes/LoginRoutes.js"
import cors from "cors"
const app = express();

app.use(cors());
app.use(express.json());

app.use(localRoutes);
app.use(categoriasRoutes);
app.use(clienteRoutes);
app.use(eventoRoutes);
app.use(loginRoutes) ;

app.listen(3004, () => {
    console.log("Server running")
})