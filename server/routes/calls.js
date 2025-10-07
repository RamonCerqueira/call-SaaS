import express from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Schema de validação
const createCallSchema = z.object({
  phoneNumber: z.string().min(10, 'Número de telefone inválido'),
  pathwayId: z.string().optional(),
  pathwayName: z.string().optional(),
  instructions: z.string().optional(),
});

// GET /api/calls - Listar chamadas do usuário
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    const where = {
      userId: req.user.id,
      ...(status && { status }),
    };

    const [calls, total] = await Promise.all([
      prisma.call.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset),
      }),
      prisma.call.count({ where }),
    ]);

    res.json({
      calls,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
      }
    });
  } catch (error) {
    console.error('List calls error:', error);
    res.status(500).json({ error: 'Erro ao listar chamadas' });
  }
});

// GET /api/calls/:id - Obter detalhes de uma chamada
router.get('/:id', async (req, res) => {
  try {
    const call = await prisma.call.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!call) {
      return res.status(404).json({ error: 'Chamada não encontrada' });
    }

    res.json({ call });
  } catch (error) {
    console.error('Get call error:', error);
    res.status(500).json({ error: 'Erro ao buscar chamada' });
  }
});

// POST /api/calls - Criar nova chamada
router.post('/', async (req, res) => {
  try {
    const validatedData = createCallSchema.parse(req.body);

    // Criar chamada no banco
    const call = await prisma.call.create({
      data: {
        userId: req.user.id,
        phoneNumber: validatedData.phoneNumber,
        pathwayId: validatedData.pathwayId,
        pathwayName: validatedData.pathwayName,
        status: 'pending',
        metadata: validatedData.instructions ? {
          instructions: validatedData.instructions
        } : null,
      },
    });

    // TODO: Aqui você integraria com a API da Bland.ai para realmente fazer a chamada
    // const blandResponse = await blandApi.sendCall({...})
    // await prisma.call.update({
    //   where: { id: call.id },
    //   data: { blandCallId: blandResponse.call_id, status: 'in_progress' }
    // })

    res.status(201).json({ call });
  } catch (error) {
    console.error('Create call error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Erro ao criar chamada' });
  }
});

// GET /api/calls/stats - Obter estatísticas de chamadas
router.get('/stats/summary', async (req, res) => {
  try {
    const [
      totalCalls,
      completedCalls,
      failedCalls,
      inProgressCalls,
      totalDuration,
      totalCost,
    ] = await Promise.all([
      prisma.call.count({ where: { userId: req.user.id } }),
      prisma.call.count({ where: { userId: req.user.id, status: 'completed' } }),
      prisma.call.count({ where: { userId: req.user.id, status: 'failed' } }),
      prisma.call.count({ where: { userId: req.user.id, status: 'in_progress' } }),
      prisma.call.aggregate({
        where: { userId: req.user.id, status: 'completed' },
        _sum: { duration: true },
      }),
      prisma.call.aggregate({
        where: { userId: req.user.id },
        _sum: { cost: true },
      }),
    ]);

    const avgCost = totalCalls > 0 
      ? (totalCost._sum.cost || 0) / totalCalls 
      : 0;

    const successRate = totalCalls > 0 
      ? (completedCalls / totalCalls) * 100 
      : 0;

    res.json({
      totalCalls,
      completedCalls,
      failedCalls,
      inProgressCalls,
      totalDuration: totalDuration._sum.duration || 0,
      totalCost: totalCost._sum.cost || 0,
      avgCost: parseFloat(avgCost.toFixed(2)),
      successRate: parseFloat(successRate.toFixed(1)),
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

export default router;
