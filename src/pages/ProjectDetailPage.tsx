import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { projectsApi } from '../api/projectsApi';
import { tasksApi } from '../api/tasksApi';
import ConfirmDialog from '../components/ConfirmDialog';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import ProjectForm from '../components/ProjectForm';
import TaskForm from '../components/TaskForm';
import type { Project, Task } from '../types';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id) : null;
  const navigate = useNavigate();

  // const [project, setProject] = useState<Project | null>(null);
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false); // Used for loading state
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const { data, isPending } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => projectsApi.getById(projectId!),
    enabled: !!projectId,
  });
  const project = data?.data || null;

  const { data: data2 } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => tasksApi.getByProjectId(projectId!),
    enabled: !!projectId,
  });
  const tasks = data2?.data || [];

  // const fetchProjectData = async () => {
  //   if (!projectId) {
  //     setError('Invalid project ID');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const [projectRes, tasksRes] = await Promise.all([
  //       projectsApi.getById(projectId),
  //       tasksApi.getByProjectId(projectId),
  //     ]);

  //     setProject(projectRes.data);
  //     setTasks(tasksRes.data);
  //   } catch (err: unknown) {
  //     const error = err as {
  //       response?: { data?: { error?: string } };
  //       message?: string;
  //     };
  //     setError(
  //       error.response?.data?.error ||
  //         error.message ||
  //         'Failed to fetch project data'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpdateProject = async (data: Partial<Omit<Project, 'id'>>) => {
    if (!projectId) return;
    try {
      setIsUpdatingProject(true);
      const res = await projectsApi.update(projectId, data);
      // setProject(res.data);
      setIsEditingProject(false);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.error ||
          error.message ||
          'Failed to update project'
      );
    } finally {
      setIsUpdatingProject(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectId) return;
    try {
      setIsDeletingProject(true);
      await projectsApi.remove(projectId);
      navigate('/projects');
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.error ||
          error.message ||
          'Failed to delete project'
      );
      setIsDeletingProject(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCreateTask = async (
    data: Omit<Task, 'id'> | Partial<Omit<Task, 'id'>>
  ) => {
    if (!projectId) return;
    try {
      setIsCreatingTask(true);
      // Ensure required fields are present
      if (!('title' in data) || !data.title) {
        setError('Task title is required');
        return;
      }
      const createData = {
        projectId,
        title: data.title,
        status: data.status || 'todo',
        assigneeId: data.assigneeId || null,
      };
      const res = await tasksApi.create(createData);
      setTasks([...tasks, res.data]);
      setShowCreateTask(false);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.error || error.message || 'Failed to create task'
      );
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleUpdateTask = async (data: Partial<Omit<Task, 'id'>>) => {
    if (!editingTask) return;
    try {
      setIsUpdatingTask(true);
      const res = await tasksApi.update(editingTask.id, data);
      setTasks(tasks.map((t) => (t.id === editingTask.id ? res.data : t)));
      setEditingTask(null);
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.error || error.message || 'Failed to update task'
      );
    } finally {
      setIsUpdatingTask(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      setDeletingTaskId(taskId);
      await tasksApi.remove(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.error || error.message || 'Failed to delete task'
      );
    } finally {
      setDeletingTaskId(null);
    }
  };

  // useEffect(() => {
  //   fetchProjectData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [projectId]);

  if (isPending) return <Loader />;
  if (error && !isEditingProject && !showCreateTask && !editingTask)
    return <ErrorMessage message={error} onRetry={() => {}} />;
  if (!project) return <ErrorMessage message='Project not found' />;

  return (
    <div className='p-6 space-y-6 max-w-4xl mx-auto'>
      <Link to='/projects' className='text-blue-400 hover:text-blue-300'>
        ← Back to Projects
      </Link>

      {isEditingProject ? (
        <div className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
          <h2 className='text-xl font-semibold text-gray-100 mb-4'>
            Edit Project
          </h2>
          <ProjectForm
            project={project}
            onSubmit={handleUpdateProject}
            onCancel={() => {
              setIsEditingProject(false);
              setError(null);
            }}
            isLoading={isUpdatingProject}
          />
        </div>
      ) : (
        <div className='bg-gray-800 rounded-lg p-6'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <h1 className='text-3xl font-semibold text-gray-100 mb-2'>
                {project.name}
              </h1>
              {project.description && (
                <p className='text-gray-300 mb-4'>{project.description}</p>
              )}
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setIsEditingProject(true)}
                className='px-3 py-1 text-sm bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600'
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className='px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-100'>
            Tasks ({tasks.length})
          </h2>
          {!showCreateTask && !editingTask && (
            <button
              onClick={() => setShowCreateTask(true)}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm'
            >
              + Create Task
            </button>
          )}
        </div>

        {showCreateTask && projectId && (
          <div className='bg-gray-800 rounded-lg p-6 mb-4 border border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-100 mb-4'>
              Create New Task
            </h3>
            <TaskForm
              projectId={projectId}
              onSubmit={handleCreateTask}
              onCancel={() => {
                setShowCreateTask(false);
                setError(null);
              }}
              isLoading={isCreatingTask}
            />
          </div>
        )}

        {editingTask && projectId && (
          <div className='bg-gray-800 rounded-lg p-6 mb-4 border border-gray-700'>
            <h3 className='text-lg font-semibold text-gray-100 mb-4'>
              Edit Task
            </h3>
            <TaskForm
              task={editingTask}
              projectId={projectId}
              onSubmit={handleUpdateTask}
              onCancel={() => {
                setEditingTask(null);
                setError(null);
              }}
              isLoading={isUpdatingTask}
            />
          </div>
        )}

        {tasks.length === 0 ? (
          <p className='text-gray-400'>No tasks for this project.</p>
        ) : (
          <ul className='space-y-2'>
            {tasks.map((task) => (
              <li
                key={task.id}
                className='bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-medium text-gray-100'>{task.title}</h3>
                    <div className='mt-2 flex items-center gap-4 text-sm text-gray-400'>
                      <span
                        className={`px-2 py-1 rounded ${
                          task.status === 'completed'
                            ? 'bg-green-900 text-green-300'
                            : task.status === 'in-progress'
                            ? 'bg-blue-900 text-blue-300'
                            : task.status === 'blocked'
                            ? 'bg-red-900 text-red-300'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setEditingTask(task)}
                      className='px-2 py-1 text-xs bg-gray-700 text-gray-100 rounded hover:bg-gray-600'
                      disabled={editingTask !== null || deletingTaskId !== null}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to delete this task?'
                          )
                        ) {
                          handleDeleteTask(task.id);
                        }
                      }}
                      className='px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700'
                      disabled={
                        editingTask !== null || deletingTaskId === task.id
                      }
                    >
                      {deletingTaskId === task.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          title='Delete Project'
          message={`Are you sure you want to delete "${project.name}"? This will also delete all associated tasks. This action cannot be undone.`}
          onConfirm={handleDeleteProject}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText={isDeletingProject ? 'Deleting...' : 'Delete'}
          cancelText='Cancel'
          variant='danger'
          isLoading={isDeletingProject}
        />
      )}
    </div>
  );
}
