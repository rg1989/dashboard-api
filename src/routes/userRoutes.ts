import express, { Request, Response, NextFunction } from 'express';
import { userController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// POST create a new user (registration - no auth required)
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res);
});

// Protected routes below - each one uses the authentication middleware

// GET all users
router.get('/', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
    userController.getAllUsers(req, res);
});

// GET a single user by ID
router.get('/:id', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
    userController.getUserById(req, res);
});

// PUT update a user
router.put('/:id', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
    userController.updateUser(req, res);
});

// DELETE a user
router.delete('/:id', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
    userController.deleteUser(req, res);
});

export default router; 