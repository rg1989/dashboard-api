"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// POST login with username and password
router.post('/login', (req, res, next) => {
    authController_1.authController.login(req, res);
});
// POST refresh token to get a new access token
router.post('/refresh-token', (req, res, next) => {
    authController_1.authController.refreshToken(req, res);
});
// POST logout to invalidate tokens
router.post('/logout', (req, res, next) => {
    authController_1.authController.logout(req, res);
});
exports.default = router;
