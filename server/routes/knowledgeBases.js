import express from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

const createKBSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  type: z.enum(['text', 'document', 'link']).default('text'),
  content: z.any().optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
});

// GET /api/knowledge-bases
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;

    const where = {
      userId: req.user.id,
      ...(status && { status }),
    };

    const knowledgeBases = await prisma.knowledgeBase.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ knowledgeBases });
  } catch (error) {
    console.error('List knowledge bases error:', error);
    res.status(500).json({ error: 'Erro ao listar bases de conhecimento' });
  }
});

// GET /api/knowledge-bases/:id
router.get('/:id', async (req, res) => {
  try {
    const kb = await prisma.knowledgeBase.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!kb) {
      return res.status(404).json({ error: 'Base de conhecimento não encontrada' });
    }

    res.json({ knowledgeBase: kb });
  } catch (error) {
    console.error('Get knowledge base error:', error);
    res.status(500).json({ error: 'Erro ao buscar base de conhecimento' });
  }
});

// POST /api/knowledge-bases
router.post('/', async (req, res) => {
  try {
    const validatedData = createKBSchema.parse(req.body);

    const kb = await prisma.knowledgeBase.create({
      data: {
        userId: req.user.id,
        name: validatedData.name,
        description: validatedData.description,
        type: validatedData.type,
        content: validatedData.content,
        status: validatedData.status,
      },
    });

    res.status(201).json({ knowledgeBase: kb });
  } catch (error) {
    console.error('Create knowledge base error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Erro ao criar base de conhecimento' });
  }
});

// PUT /api/knowledge-bases/:id
router.put('/:id', async (req, res) => {
  try {
    const validatedData = createKBSchema.partial().parse(req.body);

    const kb = await prisma.knowledgeBase.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!kb) {
      return res.status(404).json({ error: 'Base de conhecimento não encontrada' });
    }

    const updatedKB = await prisma.knowledgeBase.update({
      where: { id: req.params.id },
      data: validatedData,
    });

    res.json({ knowledgeBase: updatedKB });
  } catch (error) {
    console.error('Update knowledge base error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Erro ao atualizar base de conhecimento' });
  }
});

// DELETE /api/knowledge-bases/:id
router.delete('/:id', async (req, res) => {
  try {
    const kb = await prisma.knowledgeBase.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!kb) {
      return res.status(404).json({ error: 'Base de conhecimento não encontrada' });
    }

    await prisma.knowledgeBase.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Base de conhecimento deletada com sucesso' });
  } catch (error) {
    console.error('Delete knowledge base error:', error);
    res.status(500).json({ error: 'Erro ao deletar base de conhecimento' });
  }
});

export default router;
