import { useState, FormEvent } from 'react';
import type { Project } from '../types';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, 'id'> | Partial<Omit<Project, 'id'>>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProjectForm({ project, onSubmit, onCancel, isLoading }: ProjectFormProps) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [ownerId, setOwnerId] = useState<string>(project?.ownerId?.toString() || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: name.trim(),
      description: description.trim(),
      ownerId: ownerId ? parseInt(ownerId) : null,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Project Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter project name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter project description"
        />
      </div>

      <div>
        <label htmlFor="ownerId" className="block text-sm font-medium text-gray-300 mb-1">
          Owner ID (optional)
        </label>
        <input
          type="number"
          id="ownerId"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter owner ID"
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
          {isLoading ? 'Saving...' : project ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}

