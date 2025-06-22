import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT, AuthRequest } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

// 예약 생성
router.post('/', authenticateJWT, async (req: AuthRequest, res) => {
  const { experienceId } = req.body;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  const exp = await prisma.experience.findUnique({ where: { id: experienceId } });
  if (!exp) return res.status(404).json({ error: '경험 없음' });
  const reservation = await prisma.reservation.create({
    data: { experienceId, userId }
  });
  res.json(reservation);
});

// 내 예약 목록
router.get('/my', authenticateJWT, async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  const reservations = await prisma.reservation.findMany({
    where: { userId },
    include: { experience: true }
  });
  res.json(reservations);
});

export default router; 