import { Request, Response } from 'express';
import { UserModel, User } from '../models/User';

export const userController = {
    // Get all users
    getAllUsers: (req: Request, res: Response) => {
        try {
            const users = UserModel.getAll();
            // Don't send passwords in the response
            const safeUsers = users.map(({ password, ...rest }) => rest);
            return res.status(200).json(safeUsers);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get users', error });
        }
    },

    // Get user by ID
    getUserById: (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = UserModel.getById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Don't send password in the response
            const { password, ...safeUser } = user;
            return res.status(200).json(safeUser);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get user', error });
        }
    },

    // Create a new user
    createUser: (req: Request, res: Response) => {
        try {
            const userData: Omit<User, 'id'> = req.body;

            // Validate required fields
            if (!userData.username || !userData.email || !userData.password) {
                return res.status(400).json({ message: 'Username, email and password are required' });
            }

            const newUser = UserModel.create(userData);

            // Don't send password in the response
            const { password, ...safeUser } = newUser;
            return res.status(201).json(safeUser);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to create user', error });
        }
    },

    // Update a user
    updateUser: (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userData: Partial<Omit<User, 'id'>> = req.body;

            const updatedUser = UserModel.update(id, userData);

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Don't send password in the response
            const { password, ...safeUser } = updatedUser;
            return res.status(200).json(safeUser);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update user', error });
        }
    },

    // Delete a user
    deleteUser: (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const success = UserModel.delete(id);

            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete user', error });
        }
    }
}; 