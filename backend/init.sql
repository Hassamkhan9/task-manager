CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false
);

INSERT INTO tasks (title, completed) VALUES
  ('Learn TypeScript', false),
  ('Learn Docker Compose', false)
ON CONFLICT DO NOTHING;