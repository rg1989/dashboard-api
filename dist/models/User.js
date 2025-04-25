"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// Mock database using an array to store users
let users = [];
exports.UserModel = {
    // Get all users
    getAll: () => {
        return users;
    },
    // Get a user by id
    getById: (id) => {
        return users.find(user => user.id === id);
    },
    // Create a new user
    create: (userData) => {
        const newUser = Object.assign({ id: Date.now().toString() }, userData);
        users.push(newUser);
        return newUser;
    },
    // Update an existing user
    update: (id, userData) => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1)
            return undefined;
        users[index] = Object.assign(Object.assign({}, users[index]), userData);
        return users[index];
    },
    // Delete a user
    delete: (id) => {
        const initialLength = users.length;
        users = users.filter(user => user.id !== id);
        return users.length < initialLength;
    }
};
