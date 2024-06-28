Objective:
Create a simple RESTful API using Node.js and Express. Document the API using Swagger. Implement authentication and authorization, and write test cases to ensure the functionality of the API.

Create a basic API with the following endpoints:
POST /register: Register a new user.
POST /login: Authenticate a user and return a JWT token.
GET /profile: Get the authenticated user's profile information (protected route).

User Schema:
User object should contain id, username, password, email, and profile fields.
Authentication & Authorization:
Use bcryptjs to hash passwords.
Use jsonwebtoken to create and verify JWT tokens.
Protect the /profile route using JWT tokens.

Swagger Documentation:
Document all endpoints using Swagger.
Provide detailed information about request parameters, request bodies, and responses.

Testing:
Write test cases using supertest and jest.
Test cases should cover:
Successful and unsuccessful user registration.
Successful and unsuccessful login.
Access to protected routes with and without valid tokens.

// {
//     "username": "sumit",
//     "email": "sumit@gmail.com",
//     "password": "sumitkv@369"
// }