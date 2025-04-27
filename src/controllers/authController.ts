import { Request, Response } from 'express';
import { UserModel } from '../models/User';

export const authController = {
    // Login with username/password
    login: (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            // Get all users
            const users = UserModel.getAll();

            // Find user with matching username and password
            const user = users.find(user =>
                user.username === username && user.password === password
            );

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Don't send password in the response
            const { password: userPassword, ...safeUser } = user;

            return res.status(200).json({
                message: 'Login successful',
                user: safeUser
            });
        } catch (error) {
            return res.status(500).json({ message: 'Login failed', error });
        }
    }
}; 