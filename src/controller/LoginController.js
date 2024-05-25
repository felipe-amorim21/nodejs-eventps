import { prismaCliente } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export class LoginController{

    async login (request, response){
        const { email, password } = request.body;
        
        try {
            const cliente = await prismaCliente.cliente.findUnique({
                where: {
                    email
                }
            })

            if(!cliente){
                response.status(401).json({"message": "Client Unauthorized"});
            }

            const verifyPassword = bcrypt.compareSync(password, cliente.password);

            if (!verifyPassword) {
                return response.status(401).json({"message": "Client Unauthorized"});
            }

            const token =  jwt.sign({"clientId": cliente.id, "isAdmin": cliente.isAdmin}, process.env.SECRET_JWT, { expiresIn: '30min' });

            return response.status(200).json({"id": cliente.id, "name": cliente.nome, "token": token})

        } catch (error) {
            return response.status(500).send(error);
        }


    }
}