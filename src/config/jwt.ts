import { SignOptions } from 'jsonwebtoken';

// Make sure the values are compatible with jsonwebtoken's expected types
export const JWT_CONFIG = {
    SECRET: 'your-secret-key-should-be-long-and-complex', // In production, use environment variables
    TOKEN_EXPIRATION: '1h' as const, // 1 hour
    REFRESH_TOKEN_EXPIRATION: '7d' as const // 7 days
}; 