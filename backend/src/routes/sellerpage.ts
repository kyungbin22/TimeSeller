import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT, AuthRequest } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

// 내 경험 리스트 (셀러만)
router.get('/my-experiences', authenticateJWT, async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.isSeller) return res.status(403).json({ error: '셀러만 접근 가능' });
  const experiences = await prisma.experience.findMany({
    where: { sellerId: userId },
    include: { reservations: true, reviews: true }
  });
  res.json(experiences);
});

// 내 경험에 대한 예약 리스트 (셀러만)
router.get('/my-reservations', authenticateJWT, async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.isSeller) return res.status(403).json({ error: '셀러만 접근 가능' });
  const reservations = await prisma.reservation.findMany({
    where: { experience: { sellerId: userId } },
    include: { experience: true, user: true }
  });
  res.json(reservations);
});

export default router; 