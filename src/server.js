"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userController_1 = require("./controllers/userController");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
// Request logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Request received`);
    next();
});
// Routes
app.use('/api', authRoutes_1.default);
// User Routes
app.get('/api/users', (req, res) => {
    console.log('GET /api/users - Fetching all users');
    userController_1.userController.getAllUsers(req, res);
});
app.get('/api/users/:id', (req, res) => {
    console.log(`GET /api/users/${req.params.id} - Fetching user by ID`);
    userController_1.userController.getUserById(req, res);
});
app.put('/api/users/:id', (req, res) => {
    console.log(`PUT /api/users/${req.params.id} - Updating user:`, req.body);
    userController_1.userController.updateUser(req, res);
});
// Default route
app.get('/', (req, res) => {
    console.log('GET / - Default route accessed');
    res.json({ message: 'Welcome to Dashboard API' });
});
// 404 Handler for undefined routes
app.use('*', (req, res) => {
    console.log(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /');
    console.log('  POST /api/login');
    console.log('  GET  /api/users');
    console.log('  GET  /api/users/:id');
    console.log('  PUT  /api/users/:id');
});
