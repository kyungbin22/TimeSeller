import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT, AuthRequest } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

// 후기 작성 (예약자만)
router.post('/', authenticateJWT, async (req: AuthRequest, res) => {
  const { experienceId, rating, comment } = req.body;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  // 예약 여부 확인
  const reservation = await prisma.reservation.findFirst({
    where: { experienceId, userId }
  });
  if (!reservation) return res.status(403).json({ error: '예약자만 후기 작성 가능' });
  // 이미 후기 작성했는지 확인
  const exists = await prisma.review.findFirst({ where: { experienceId, userId } });
  if (exists) return res.status(409).json({ error: '이미 작성한 후기' });
  const review = await prisma.review.create({
    data: { experienceId, userId, rating, comment }
  });
  res.json(review);
});

// 내 후기 목록
router.get('/my', authenticateJWT, async (req: AuthRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: '인증 필요' });
  const reviews = await prisma.review.findMany({
    where: { userId },
    include: { experience: true }
  });
  res.json(reviews);
});

export default router; 