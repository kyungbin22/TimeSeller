import { Router } from 'express';
import sellerRouter from './seller';
import authRouter from './auth';
import reservationRouter from './reservation';
import reviewRouter from './review';
import sellerpageRouter from './sellerpage';
import experienceRouter from './experience';

const router = Router();

router.use('/seller', sellerRouter);
router.use('/auth', authRouter);
router.use('/reservation', reservationRouter);
router.use('/review', reviewRouter);
router.use('/sellerpage', sellerpageRouter);
router.use('/experience', experienceRouter);

export default router; 