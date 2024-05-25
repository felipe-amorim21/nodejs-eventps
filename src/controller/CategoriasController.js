import { prismaCliente } from "../database/PrismaClient.js";

const CategoriaController = {
    async criarCategoria(req, res) {
      const { categoria, id } = req.body;
      // console.log(dados.categoria);
      try {
        const novaCategoria = await prismaCliente.categoria.create({
          data: {
            id: id,
            categoria: categoria,
          },
        });
        return res.status(201).json(novaCategoria);
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro ao criar categoria' });
      }
    },
  
    async listarCategorias(req, res) {
      try {
        const categorias = await prismaCliente.categoria.findMany();
        return res.status(200).json(categorias);
      } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ error: 'Erro ao listar categorias' });
      }
    },
  
    async buscarCategoriaPorId(req, res) {
      const { id } = req.params;
      try {
        const categoria = await prismaCliente.categoria.findUnique({
          where: {
            id: id,
          },
        });
        if (!categoria) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.json(categoria);
      } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar categoria' });
      }
    },
  
    async atualizarCategoria(req, res) {
      const { id } = req.params;
      const { categoria } = req.body;
      try {
        const categoriaAtualizada = await prismaCliente.categoria.update({
          where: {
            id: id,
          },
          data: {
            categoria,
          },
        });
        res.json(categoriaAtualizada);
      } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
      }
    },
  
    async deletarCategoria(req, res) {
      const { id } = req.params;
      try {
        await prismaCliente.categoria.delete({
          where: {
            id: id,
          },
        });
        res.status(204).send();
      } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).json({ error: 'Erro ao deletar categoria' });
      }
    },
  };
  
 
 
 export default CategoriaController;