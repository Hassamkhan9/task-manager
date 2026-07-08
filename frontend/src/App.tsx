import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/api/tasks');
    const data: Task[] = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <span className="text-gray-700">{task.title}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;