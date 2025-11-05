import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../api/projectsApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ProjectForm from '../components/ProjectForm';
import type { Project } from '../types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectsApi.getAll();
      setProjects(res.data);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.error ||
          error.message ||
          'Failed to fetch projects'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: Omit<Project, 'id'> | Partial<Omit<Project, 'id'>>
  ) => {};

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <Loader />;
  if (error && !showCreateForm)
    return <ErrorMessage message={error} onRetry={fetchProjects} />;

  return (
    <div className='p-6 space-y-4 max-w-4xl mx-auto'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-100'>Projects</h1>
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            + Create Project
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
          <h2 className='text-xl font-semibold text-gray-100 mb-4'>
            Create New Project
          </h2>
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => {
              setShowCreateForm(false);
              setError(null);
            }}
            isLoading={true}
          />
        </div>
      )}

      {projects.length === 0 ? (
        <p className='text-gray-400'>No projects found.</p>
      ) : (
        <ul className='divide-y divide-gray-700'>
          {projects.map((p) => (
            <li
              key={p.id}
              className='py-4 hover:bg-gray-800 transition-colors rounded-lg px-4'
            >
              <Link to={`/projects/${p.id}`} className='block'>
                <span className='font-medium text-gray-100'>{p.name}</span>
                {p.description && (
                  <span className='text-gray-400 ml-2'>— {p.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
