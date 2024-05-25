import { prismaCliente } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs"

export class ClienteController {
    async findAllClients (request, response) {
       const { clientId } = request.query;

       try {
           const clients = clientId
           ? await prismaCliente.cliente.findUnique({
               where: { id: clientId },
               select: {
                   id: true,
                   nome: true,
                   email: true,
                   isAdmin: true
               }
           })
           : await prismaCliente.cliente.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                isAdmin: true
            }
       })
       
       if (!clients) {
           return response.status(404).json({ message: 'Client not found' });
       }
       
       return response.status(200).json(clients);
       } catch (error) {
           return response.status(500).send(error);
       }
   }

    async createCliente(request, response){
        const { nome, email, password, isAdmin } = request.body;
        try {
            const clienteCheck = await prismaCliente.cliente.findFirst({
                where: {
                    email: email
                }
            })
            
            if(clienteCheck){
                return response.status(409).json("E-mail already registered");
            }

            const passwordHash = bcrypt.hashSync(password, 10);

            const cliente = await prismaCliente.cliente.create({
                data:{
                    nome,
                    email,
                    password: passwordHash,
                    isAdmin
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    isAdmin: true
                }
            })
            response.status(200).json(cliente)
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async updateCliente(request, response){
        try {
            const { id } = request.params;
            const { nome, email,  } = request.body;
            const cliente = await prismaCliente.local.update({
            where: {
                id
            },
            data:{
                nome: nome,
            }
            
        })
        if(!cliente){
            response.status(404).send()    ;   
        }
        response.status(200).json(local);
        } catch (error) {
            response.status(500).send();
        }
    }

    async deleteCliente(request, response) {
        try {
            const { id } = request.params;
            const cliente = await prismaCliente.cliente.delete({
            where: {
                id
            }
        })
        if (!cliente){
            response.status(404).send();
        }
            response.status(204).send();
        } catch (error) {
            response.status(500).send();
        }
        
    }

    
}