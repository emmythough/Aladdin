import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTasks from '@wasp/queries/getTasks';
import createTask from '@wasp/actions/createTask';
import updateTask from '@wasp/actions/updateTask';
import toggleTask from '@wasp/actions/toggleTask';

export function DashboardPage() {
  const { data: tasks, isLoading, error } = useQuery(getTasks);
  const createTaskFn = useAction(createTask);
  const updateTaskFn = useAction(updateTask);
  const toggleTaskFn = useAction(toggleTask);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTask = () => {
    createTaskFn({ description: newTaskDescription });
    setNewTaskDescription('');
  };

  const handleUpdateTask = (taskId, newDescription) => {
    updateTaskFn({ id: taskId, description: newDescription });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Task'
          className='px-1 py-2 border rounded text-lg'
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <input
              type='checkbox'
              checked={task.isDone}
              onChange={() => toggleTaskFn({ id: task.id })}
              className='mr-2 h-6 w-6'
            />
            <input
              type='text'
              value={task.description}
              onChange={(e) => handleUpdateTask(task.id, e.target.value)}
              className='border px-2 py-1 rounded text-lg'
            />
          </div>
        ))}
      </div>
    </div>
  );
}