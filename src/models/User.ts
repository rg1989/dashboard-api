export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}

// Mock database using an array to store users
let users: User[] = [{
    username: 'admin', password: 'admin', id: '1', name: 'Admin', email: 'admin@example.com', phone: '1234567890'

}];

export const UserModel = {
    // Get all users
    getAll: (): User[] => {
        return users;
    },

    // Get a user by id
    getById: (id: string): User | undefined => {
        return users.find(user => user.id === id);
    },

    // Create a new user
    create: (userData: Omit<User, 'id'>): User => {
        const newUser: User = {
            id: Date.now().toString(),
            ...userData
        };
        users.push(newUser);
        return newUser;
    },

    // Update an existing user
    update: (id: string, userData: Partial<Omit<User, 'id'>>): User | undefined => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return undefined;

        users[index] = { ...users[index], ...userData };
        return users[index];
    },

    // Delete a user
    delete: (id: string): boolean => {
        const initialLength = users.length;
        users = users.filter(user => user.id !== id);
        return users.length < initialLength;
    }
}; 