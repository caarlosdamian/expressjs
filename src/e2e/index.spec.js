import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import '../strategies/local-strategy.mjs';
import { createApp } from '../createApp.mjs';

describe('/api/auth', () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect()
      .then(() => console.log('Connected to Database'))
      .catch((err) => console.log(err));

    app = createApp();
  });

  it('should return 401 when not logged in', async () => {
    const res = await request(app).get('/api/auth/status');
    expect(res.status).toBe(401);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
