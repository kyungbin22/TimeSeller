import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// 닉네임 중복 검사
router.post('/check-nickname', async (req, res) => {
  const { nickname } = req.body;
  if (!nickname) {
    return res.status(400).json({ error: '닉네임을 입력해주세요' });
  }
  
  const exists = await prisma.user.findUnique({ where: { nickname } });
  if (exists) {
    return res.json({ available: false, message: '이미 사용 중인 닉네임입니다' });
  } else {
    return res.json({ available: true, message: '사용 가능한 닉네임입니다' });
  }
});

// 회원가입
router.post('/register', async (req, res) => {
  const { email, password, nickname, name } = req.body;
  if (!email || !password || !nickname) {
    return res.status(400).json({ error: '이메일/비밀번호/닉네임 필수' });
  }
  
  // 비밀번호 조건: 8자리 이상, 영문+숫자 조합
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return res.status(400).json({ error: '비밀번호는 8자리 이상, 영문과 숫자를 모두 포함해야 합니다.' });
  }
  
  // 이메일 중복 검사
  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) return res.status(409).json({ error: '이미 가입된 이메일' });
  
  // 닉네임 중복 검사
  const nicknameExists = await prisma.user.findUnique({ where: { nickname } });
  if (nicknameExists) return res.status(409).json({ error: '이미 사용 중인 닉네임' });
  
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hash, nickname, name }
  });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname, name: user.name, isSeller: user.isSeller } });
});

// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: '이메일/비밀번호 필수' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: '존재하지 않는 계정' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: '비밀번호 불일치' });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname, name: user.name, isSeller: user.isSeller } });
});

export default router; 