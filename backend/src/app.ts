import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id');
  res.json(result.rows);
});

app.post('/api/tasks', async (req: Request, res: Response) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *',
    [title]
  );
  res.status(201).json(result.rows[0]);
});

app.delete('/api/tasks/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.status(204).send();
});

app.post('/api/tasks/reset', async (req: Request, res: Response) => {
  await pool.query('DELETE FROM tasks');
  await pool.query(
    `INSERT INTO tasks (title, completed) VALUES
     ('Learn TypeScript', false),
     ('Learn Docker Compose', false)`
  );
  const result = await pool.query('SELECT * FROM tasks ORDER BY id');
  res.status(200).json(result.rows);
});

export default app;