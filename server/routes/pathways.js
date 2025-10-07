import express from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

const createPathwaySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  nodes: z.any().optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

// GET /api/pathways
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;

    const where = {
      userId: req.user.id,
      ...(status && { status }),
    };

    const pathways = await prisma.pathway.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ pathways });
  } catch (error) {
    console.error('List pathways error:', error);
    res.status(500).json({ error: 'Erro ao listar pathways' });
  }
});

// GET /api/pathways/:id
router.get('/:id', async (req, res) => {
  try {
    const pathway = await prisma.pathway.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!pathway) {
      return res.status(404).json({ error: 'Pathway não encontrado' });
    }

    res.json({ pathway });
  } catch (error) {
    console.error('Get pathway error:', error);
    res.status(500).json({ error: 'Erro ao buscar pathway' });
  }
});

// POST /api/pathways
router.post('/', async (req, res) => {
  try {
    const validatedData = createPathwaySchema.parse(req.body);

    const pathway = await prisma.pathway.create({
      data: {
        userId: req.user.id,
        name: validatedData.name,
        description: validatedData.description,
        nodes: validatedData.nodes,
        status: validatedData.status,
      },
    });

    res.status(201).json({ pathway });
  } catch (error) {
    console.error('Create pathway error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Erro ao criar pathway' });
  }
});

// PUT /api/pathways/:id
router.put('/:id', async (req, res) => {
  try {
    const validatedData = createPathwaySchema.partial().parse(req.body);

    const pathway = await prisma.pathway.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!pathway) {
      return res.status(404).json({ error: 'Pathway não encontrado' });
    }

    const updatedPathway = await prisma.pathway.update({
      where: { id: req.params.id },
      data: validatedData,
    });

    res.json({ pathway: updatedPathway });
  } catch (error) {
    console.error('Update pathway error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Erro ao atualizar pathway' });
  }
});

// DELETE /api/pathways/:id
router.delete('/:id', async (req, res) => {
  try {
    const pathway = await prisma.pathway.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!pathway) {
      return res.status(404).json({ error: 'Pathway não encontrado' });
    }

    await prisma.pathway.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Pathway deletado com sucesso' });
  } catch (error) {
    console.error('Delete pathway error:', error);
    res.status(500).json({ error: 'Erro ao deletar pathway' });
  }
});

export default router;
