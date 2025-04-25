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
exports.userController = void 0;
const User_1 = require("../models/User");
exports.userController = {
    // Get all users
    getAllUsers: (req, res) => {
        try {
            const users = User_1.UserModel.getAll();
            // Don't send passwords in the response
            const safeUsers = users.map((_a) => {
                var { password } = _a, rest = __rest(_a, ["password"]);
                return rest;
            });
            return res.status(200).json(safeUsers);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to get users', error });
        }
    },
    // Get user by ID
    getUserById: (req, res) => {
        try {
            const { id } = req.params;
            const user = User_1.UserModel.getById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Don't send password in the response
            const { password } = user, safeUser = __rest(user, ["password"]);
            return res.status(200).json(safeUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to get user', error });
        }
    },
    // Create a new user
    createUser: (req, res) => {
        try {
            const userData = req.body;
            // Validate required fields
            if (!userData.username || !userData.email || !userData.password) {
                return res.status(400).json({ message: 'Username, email and password are required' });
            }
            const newUser = User_1.UserModel.create(userData);
            // Don't send password in the response
            const { password } = newUser, safeUser = __rest(newUser, ["password"]);
            return res.status(201).json(safeUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to create user', error });
        }
    },
    // Update a user
    updateUser: (req, res) => {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = User_1.UserModel.update(id, userData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Don't send password in the response
            const { password } = updatedUser, safeUser = __rest(updatedUser, ["password"]);
            return res.status(200).json(safeUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to update user', error });
        }
    },
    // Delete a user
    deleteUser: (req, res) => {
        try {
            const { id } = req.params;
            const success = User_1.UserModel.delete(id);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to delete user', error });
        }
    }
};
