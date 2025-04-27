import express, { Request, Response, NextFunction } from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

// POST login with username and password
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authController.login(req, res);
});

export default router;
