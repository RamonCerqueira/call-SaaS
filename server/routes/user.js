import express from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().optional(),
  blandApiKey: z.string().optional(),
  webhookUrl: z.string().url().optional().or(z.literal('')),
  webhookEnabled: z.boolean().optional(),
});

// GET /api/user/profile
router.get('/profile', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        blandApiKey: true,
        webhookUrl: true,
        webhookEnabled: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// PUT /api/user/profile
router.put('/profile', async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: validatedData,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        blandApiKey: true,
        webhookUrl: true,
        webhookEnabled: true,
        updatedAt: true,
      }
    });

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

// DELETE /api/user/account
router.delete('/account', async (req, res) => {
  try {
    // Deletar todas as sessões do usuário
    await prisma.session.deleteMany({
      where: { userId: req.user.id }
    });

    // Deletar usuário (cascade vai deletar calls, pathways, etc)
    await prisma.user.delete({
      where: { id: req.user.id }
    });

    res.json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Erro ao deletar conta' });
  }
});

export default router;
