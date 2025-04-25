# Dashboard API

A simple RESTful API for user management.

## Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start
```

## API Endpoints

### Users

- **GET /api/users** - Get all users
- **GET /api/users/:id** - Get a single user by ID
- **POST /api/users** - Create a new user
  - Required fields: `username`, `email`, `password`
  - Optional fields: `name`, `phone`
- **PUT /api/users/:id** - Update a user
- **DELETE /api/users/:id** - Delete a user

## User Model

```typescript
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}
```

## Example Requests

### Create a new user

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "password": "securepassword"
  }'
```

### Get all users

```bash
curl -X GET http://localhost:3001/api/users
```

### Get a single user

```bash
curl -X GET http://localhost:3001/api/users/USER_ID
```

### Update a user

```bash
curl -X PUT http://localhost:3001/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith"
  }'
```

### Delete a user

```bash
curl -X DELETE http://localhost:3001/api/users/USER_ID
``` 