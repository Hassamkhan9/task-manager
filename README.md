# Task Manager

A full-stack task management app built to practice TypeScript, automated
testing, and container orchestration.

## Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Unit testing**: Jest (frontend and backend)
- **End-to-end testing**: Cypress
- **Containerization**: Docker Compose (three services: frontend, backend, database)

## Features

- Add, view, and delete tasks
- Data persists in PostgreSQL, survives container restarts via a Docker volume
- Fully containerized, one command starts the entire stack

## Running locally

1. Clone the repo
2. Copy `.env.example` to `.env` and adjust values if needed
3. Run:

\`\`\`bash
docker-compose up --build
\`\`\`

4. Open `http://localhost:3000`

## Running tests

Backend unit tests:
\`\`\`bash
cd backend
npm install
npm test
\`\`\`

Frontend unit tests:
\`\`\`bash
cd frontend
npm install
npm test -- --watchAll=false
\`\`\`

End-to-end tests (requires the app running, either locally or via Docker Compose):
\`\`\`bash
cd frontend
npx cypress open
\`\`\`

## Architecture

\`\`\`
Browser -> Frontend (nginx, port 3000)
                |
                v  fetch() calls
        Backend (Express, port 4000)
                |
                v  SQL queries
        Database (PostgreSQL, port 5432)
\`\`\`