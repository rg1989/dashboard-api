import express, { Request, Response, NextFunction } from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

// POST login with username and password
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authController.login(req, res);
});

// POST refresh token to get a new access token
router.post('/refresh-token', (req: Request, res: Response, next: NextFunction) => {
    authController.refreshToken(req, res);
});

// POST logout to invalidate tokens
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    authController.logout(req, res);
});

export default router;
