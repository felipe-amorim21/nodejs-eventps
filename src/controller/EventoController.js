import { prismaCliente } from "../database/PrismaClient.js";

export class EventoController {
  async findAllEventos (request, response) {
    try {
      const eventos = await prismaCliente.evento.findMany();
      response.status(200).json(eventos);
    } catch(error) {
      response.status(500).send();
    }
  };

  async filterEvento (request, response) {
    const { categoria, local, data } = request.query;
    const objQuery = {
      where: {
        AND: [
          categoria ? { categoria_id: categoria } : {},
          local ? { local_id: local } : {},
          data ? {
            data: {
              equals: new Date(data)
            }
          } : {}
        ].filter(obj => Object.keys(obj).length > 0) 
      },
      include: {
        categoria: true,
        local: true,
      }
    };
  
    try {
      const eventos = await prismaCliente.evento.findMany(objQuery);
      response.json(eventos);
    } catch (error) {
      response.status(500).json({ error: "Erro ao buscar eventos: " + error.message });
    }
  };

  async createEvento (request, response) {
    try {
      const { nome, data, descricao, categoria_id, local_id } = request.body;
      const evento = await prismaCliente.evento.create({
        data: {
          nome,
          data,
          descricao,
          categoria_id,
          local_id,
        }
      });
      response.status(201).json(evento);
    } catch (error) {
      response.status(500).json({error: "Erro ao criar um  evento: " + error.message});
    }  
  };

  async updateEvento (request, response) {
    try {
      const { id } = request.params;
      const { nome, data, descricao, categoria_id, local_id} = request.body;
      const evento = await prismaCliente.evento.update({
        where: {
          id
        },
        data:{
          nome,
          data,
          descricao,
          categoria_id, 
          local_id
        }
      });
      if (!evento){
        response.status(404).send();
      } 
      response.status(200).json(evento);
    } catch (error) {
      response.status(500).send();
    }
  };

  async deleteEvento (request, response) {
    try {
      const { id } = request.params;
      const evento = await prismaCliente.evento.delete({
        where: {
          id
        }
      });
      if (!evento){
        response.status(404).send();
      }
      response.status(204).send();
    } catch (error) {
        response.status(500).send();
      } 
  };

  async buscarEventoPorId(req, res) {
    const { id } = req.params;
    try {
      const evento = await prismaCliente.evento.findUnique({
        where: {
          id: id,
        },
      });
      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }
      res.json(evento);
    } catch (error) {
      console.error('Erro ao buscar Evento:', error);
      res.status(500).json({ error: 'Erro ao buscar Evento' });
    }
  }
}