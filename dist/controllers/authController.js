"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const jwt_1 = require("../config/jwt");
// Store for invalidated tokens (simple in-memory solution - use Redis or database in production)
const invalidatedTokens = new Set();
exports.authController = {
    // Login with username/password
    login: (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }
            // Get all users
            const users = User_1.UserModel.getAll();
            // Find user with matching username and password
            const user = users.find(user => user.username === username && user.password === password);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Generate access token
            const tokenOptions = { expiresIn: jwt_1.JWT_CONFIG.TOKEN_EXPIRATION };
            const accessToken = jsonwebtoken_1.default.sign({
                userId: user.id,
                username: user.username,
                email: user.email
            }, jwt_1.JWT_CONFIG.SECRET, tokenOptions);
            // Generate refresh token
            const refreshTokenOptions = { expiresIn: jwt_1.JWT_CONFIG.REFRESH_TOKEN_EXPIRATION };
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, jwt_1.JWT_CONFIG.SECRET, refreshTokenOptions);
            // Don't send password in the response
            const { password: userPassword } = user, safeUser = __rest(user, ["password"]);
            return res.status(200).json({
                message: 'Login successful',
                user: safeUser,
                accessToken,
                refreshToken
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Login failed', error });
        }
    },
    // Refresh token to get a new access token
    refreshToken: (req, res) => {
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
                const decoded = jsonwebtoken_1.default.verify(refreshToken, jwt_1.JWT_CONFIG.SECRET);
                const user = User_1.UserModel.getById(decoded.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Generate new access token
                const tokenOptions = { expiresIn: jwt_1.JWT_CONFIG.TOKEN_EXPIRATION };
                const accessToken = jsonwebtoken_1.default.sign({
                    userId: user.id,
                    username: user.username,
                    email: user.email
                }, jwt_1.JWT_CONFIG.SECRET, tokenOptions);
                res.status(200).json({
                    accessToken
                });
            }
            catch (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to refresh token', error });
        }
    },
    // Logout (invalidate tokens)
    logout: (req, res) => {
        try {
            const { refreshToken } = req.body;
            if (refreshToken) {
                // Add to invalidated tokens
                invalidatedTokens.add(refreshToken);
            }
            return res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Logout failed', error });
        }
    }
};
