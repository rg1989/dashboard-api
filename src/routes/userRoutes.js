"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// GET all users
router.get('/', (req, res, next) => {
    userController_1.userController.getAllUsers(req, res);
});
// GET a single user by ID
router.get('/:id', (req, res, next) => {
    userController_1.userController.getUserById(req, res);
});
// POST create a new user
router.post('/', (req, res, next) => {
    userController_1.userController.createUser(req, res);
});
// PUT update a user
router.put('/:id', (req, res, next) => {
    userController_1.userController.updateUser(req, res);
});
// DELETE a user
router.delete('/:id', (req, res, next) => {
    userController_1.userController.deleteUser(req, res);
});
exports.default = router;
