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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const User_1 = require("../models/User");
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
            // Don't send password in the response
            const { password: userPassword } = user, safeUser = __rest(user, ["password"]);
            return res.status(200).json({
                message: 'Login successful',
                user: safeUser
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Login failed', error });
        }
    }
};
