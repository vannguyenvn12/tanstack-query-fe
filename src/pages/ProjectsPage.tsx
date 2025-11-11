import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../api/projectsApi';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import ProjectForm from '../components/ProjectForm';
import type { Project } from '../types';

import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export default function ProjectsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }: { pageParam: null | string }) =>
      projectsApi.getAllCursor(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
  });

  const projects = data?.pages?.flatMap((item) => item.data.items) || [];

  const [infiniteRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: Boolean(error),
  });

  const handleCreate = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: Omit<Project, 'id'> | Partial<Omit<Project, 'id'>>
  ) => {};

  if (isError && axios.isAxiosError(error))
    return (
      <ErrorMessage message={error.response?.data.error} onRetry={() => {}} />
    );

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
      {hasNextPage && <Loader ref={infiniteRef}></Loader>}
    </div>
  );
}
