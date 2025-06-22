import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const router = Router();
const prisma = new PrismaClient();

// POST /api/seller/apply - 셀러 지원
router.post('/apply', async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      phone,
      kakaoId,
      experienceTitle,
      experienceDescription,
      experienceCategory,
      pricePerHour,
    } = req.body;

    if (!email || !name || !experienceTitle || !experienceDescription || !experienceCategory) {
      return res.status(400).json({ error: '필수 항목이 누락되었습니다.' });
    }

    const application = await prisma.sellerApplication.create({
      data: {
        email,
        name,
        phone,
        kakaoId,
        experienceTitle,
        experienceDescription,
        experienceCategory,
        pricePerHour: pricePerHour ? Number(pricePerHour) : null,
      },
    });

    // 이메일 전송 로직 (환경 변수 설정 시 활성화)
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"TimeSeller" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'TimeSeller 셀러 지원이 완료되었습니다.',
          text: '셀러 지원이 성공적으로 접수되었습니다. 검토 후 빠른 시일 내에 연락드리겠습니다.',
        });
      } catch (emailError) {
        console.error('이메일 전송 실패:', emailError);
        // 이메일 실패가 전체 프로세스를 중단시키지 않도록 처리
      }
    }

    res.status(201).json(application);
  } catch (error) {
    console.error('셀러 지원 처리 중 오류 발생:', error);
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
});

export default router; 