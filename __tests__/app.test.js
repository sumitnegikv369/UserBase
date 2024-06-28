import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

let username, authToken;

beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/userBase');
  });

afterAll(async () => {
    if (username) {
      await mongoose.connection.db.collection('users').deleteOne({ username });
    }
    await mongoose.connection.close();
});

describe("Express App Tests", ()=>{

    it("should respond with 404 for undefined routes", async ()=>{
        const response = await request(app).get('/undefined-route');

        expect(response.status).toBe(404);
    })

    it('should create a new user and return 201 status', async () => {
        const userData = {  username: 'testuser', 
        password: 'testpassword', 
        email: 'test@example.com',
        profile: {
          firstName: 'Test',
          lastName: 'User',
          bio: 'This is a test bio',
          age: 30
        } };
        const response = await request(app)
          .post('/api/v1/user/register')
          .send(userData);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
        expect(response.body).toHaveProperty('username', userData.username);
        expect(response.body).toHaveProperty('email', userData.email);
        expect(response.body).toHaveProperty('token');

        username = response.body.username;
        authToken = response.body.token;
      });

      it('should login a user and return 200 status', async () => {
        const loginData = {
          username: 'testuser',
          password: 'testpassword',
        };

        const response = await request(app)
          .post('/api/v1/user/login')
          .send(loginData);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body).toHaveProperty('username', loginData.username);
        expect(response.body).toHaveProperty('token');
      });

      it('should return 401 for invalid credentials', async () => {
        const invalidLoginData = {
          username: 'testuser',
          password: 'wrongpassword',
        };
    
        const response = await request(app)
          .post('/api/v1/user/login')
          .send(invalidLoginData);
    
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
      });

      it('should fetch user profile with 200 status', async () => {
        const authHeader = {
          Authorization: `Bearer ${authToken}`,
        };
    
        const response = await request(app)
          .get('/api/v1/user/profile')
          .set(authHeader);
    
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('firstName', 'Test');
        expect(response.body.data).toHaveProperty('lastName', 'User');
        expect(response.body.data).toHaveProperty('bio', 'This is a test bio');
        expect(response.body.data).toHaveProperty('age', 30);
      });

      it('should return 401 for unauthorized access', async () => {
        const response = await request(app)
          .get('/api/v1/user/profile');
    
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Access denied. No token provided.'); 
      });
})