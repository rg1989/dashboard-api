import express, { Request, Response, NextFunction } from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

// GET all users
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    userController.getAllUsers(req, res);
});

// GET a single user by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    userController.getUserById(req, res);
});

// POST create a new user
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    userController.createUser(req, res);
});

// PUT update a user
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    userController.updateUser(req, res);
});

// DELETE a user
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    userController.deleteUser(req, res);
});

export default router; 