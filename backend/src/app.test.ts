import request from 'supertest';
import app from './app';

describe('Task API', () => {
  it('GET /api/tasks returns a list of tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks adds a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Write Jest tests' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Write Jest tests');
  });

  it('DELETE /api/tasks/:id removes a task', async () => {
    const res = await request(app).delete('/api/tasks/1');
    expect(res.status).toBe(204);
  });
});