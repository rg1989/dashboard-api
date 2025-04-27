import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { JWT_CONFIG } from '../config/jwt';

// Store for invalidated tokens (simple in-memory solution - use Redis or database in production)
const invalidatedTokens = new Set<string>();

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

            // Generate access token
            const tokenOptions: SignOptions = { expiresIn: JWT_CONFIG.TOKEN_EXPIRATION };
            const accessToken = jwt.sign(
                {
                    userId: user.id,
                    username: user.username,
                    email: user.email
                },
                JWT_CONFIG.SECRET,
                tokenOptions
            );

            // Generate refresh token
            const refreshTokenOptions: SignOptions = { expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRATION };
            const refreshToken = jwt.sign(
                { userId: user.id },
                JWT_CONFIG.SECRET,
                refreshTokenOptions
            );

            // Don't send password in the response
            const { password: userPassword, ...safeUser } = user;

            return res.status(200).json({
                message: 'Login successful',
                user: safeUser,
                accessToken,
                refreshToken
            });
        } catch (error) {
            return res.status(500).json({ message: 'Login failed', error });
        }
    },

    // Refresh token to get a new access token
    refreshToken: (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required' });
            }

            // Check if token is invalidated
            if (invalidatedTokens.has(refreshToken)) {
                return res.status(401).json({ message: 'Refresh token has been invalidated' });
            }

            try {
                // Verify the refresh token
                const decoded = jwt.verify(refreshToken, JWT_CONFIG.SECRET) as { userId: string };

                const user = UserModel.getById(decoded.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Generate new access token
                const tokenOptions: SignOptions = { expiresIn: JWT_CONFIG.TOKEN_EXPIRATION };
                const accessToken = jwt.sign(
                    {
                        userId: user.id,
                        username: user.username,
                        email: user.email
                    },
                    JWT_CONFIG.SECRET,
                    tokenOptions
                );

                res.status(200).json({
                    accessToken
                });
            } catch (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Failed to refresh token', error });
        }
    },

    // Logout (invalidate tokens)
    logout: (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body;

            if (refreshToken) {
                // Add to invalidated tokens
                invalidatedTokens.add(refreshToken);
            }

            return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            return res.status(500).json({ message: 'Logout failed', error });
        }
    }
}; 