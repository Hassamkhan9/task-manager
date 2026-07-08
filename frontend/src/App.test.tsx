import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, title: 'Learn TypeScript', completed: false },
        { id: 2, title: 'Learn Docker Compose', completed: false }
      ]),
    })
  ) as jest.Mock;
});

test('renders Task Manager heading', () => {
  render(<App />);
  const heading = screen.getByText(/Task Manager/i);
  expect(heading).toBeInTheDocument();
});

test('renders fetched tasks', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Learn TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn Docker Compose/i)).toBeInTheDocument();
  });
});