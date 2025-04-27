"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONFIG = void 0;
// Make sure the values are compatible with jsonwebtoken's expected types
exports.JWT_CONFIG = {
    SECRET: 'your-secret-key-should-be-long-and-complex', // In production, use environment variables
    TOKEN_EXPIRATION: '1h', // 1 hour
    REFRESH_TOKEN_EXPIRATION: '7d' // 7 days
};
