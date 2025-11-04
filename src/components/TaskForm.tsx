import { useState, FormEvent } from 'react';
import type { Task } from '../types';

interface TaskFormProps {
  task?: Task;
  projectId: number;
  onSubmit: (data: Omit<Task, 'id'> | Partial<Omit<Task, 'id'>>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TaskForm({
  task,
  projectId,
  onSubmit,
  onCancel,
  isLoading,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [status, setStatus] = useState<Task['status']>(task?.status || 'todo');
  const [assigneeId, setAssigneeId] = useState<string>(task?.assigneeId?.toString() || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      projectId: task ? undefined : projectId,
      title: title.trim(),
      status,
      assigneeId: assigneeId ? parseInt(assigneeId) : null,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
          Status *
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div>
        <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-300 mb-1">
          Assignee ID (optional)
        </label>
        <input
          type="number"
          id="assigneeId"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter assignee ID"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : task ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

