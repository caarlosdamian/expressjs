import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import '../strategies/local-strategy.mjs';
import { createApp } from '../createApp.mjs';

describe('create user and login', () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect()
      .then(() => console.log('Connected to Database'))
      .catch((err) => console.log(err));

    app = createApp();
  });

  it('should create the user', async () => {
    const res = await request(app).post('/api/users/').send({
      username: 'adam123',
      password: 'password',
      displayName: 'Adam dev',
    });
    expect(res.statusCode).toBe(201);
  });

  it('should log the user in and  visit /api/auth/status and return authenticaed user', async () => {
    const res = await request(app)
      .post('/api/auth/')
      .send({
        username: 'adam123',
        password: 'password',
      })
      .then((response) => {
        return request(app)
          .get('/api/auth/status')
          .set('Cookie', response.headers['set-cookie']);
      });
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
