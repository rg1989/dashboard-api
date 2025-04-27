import express from 'express';
import cors from 'cors';
import { userController } from './controllers/userController';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Request received`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    console.log('GET / - Default route accessed');
    res.json({ message: 'Welcome to Dashboard API' });
});

// 404 Handler for undefined routes
app.use((req, res) => {
    console.log(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /');
    console.log('  POST /api/auth/login');
    console.log('  GET  /api/users');
    console.log('  POST /api/users');
    console.log('  GET  /api/users/:id');
    console.log('  PUT  /api/users/:id');
    console.log('  DELETE /api/users/:id');
}); 