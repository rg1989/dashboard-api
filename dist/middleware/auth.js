"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
    if (!token) {
        res.status(401).json({ message: 'Authentication token required' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_CONFIG.SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
