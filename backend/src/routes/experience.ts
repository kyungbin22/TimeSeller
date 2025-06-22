import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT, AuthRequest } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

// 경험 등록 (셀러만)
router.post('/', authenticateJWT, async (req: AuthRequest, res) => {
  const { title, description } = req.body;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.isSeller) return res.status(403).json({ error: '셀러만 등록 가능' });
  const exp = await prisma.experience.create({
    data: { title, description, sellerId: userId }
  });
  res.json(exp);
});

// 경험 리스트
router.get('/', async (req, res) => {
  const list = await prisma.experience.findMany({
    include: { seller: { select: { id: true, nickname: true } }, reviews: true }
  });
  res.json(list);
});

// 경험 상세
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const exp = await prisma.experience.findUnique({
    where: { id },
    include: { seller: { select: { id: true, nickname: true } }, reviews: true }
  });
  if (!exp) return res.status(404).json({ error: '경험 없음' });
  res.json(exp);
});

export default router; 