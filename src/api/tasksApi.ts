import axiosClient from './axiosClient';
import type { IPaginate, Task } from '../types';

export const tasksApi = {
  getAll: () => axiosClient.get<Task[]>('/api/tasks'),
  getById: (id: number) => axiosClient.get<Task>(`/api/tasks/${id}`),
  getByProjectId: (projectId: number) =>
    axiosClient.get<Task[]>(`/api/projects/${projectId}/tasks`),
  getByProjectIdWithPaginate: (
    projectId: number,
    page: number = 1,
    limit: number = 5
  ) =>
    axiosClient.get<IPaginate<Task[]>>(
      `/api/projects/${projectId}/page-tasks`,
      {
        params: {
          page,
          limit,
        },
      }
    ),
  create: (data: Omit<Task, 'id'>) =>
    axiosClient.post<Task>('/api/tasks', data),
  update: (id: number, data: Partial<Omit<Task, 'id'>>) =>
    axiosClient.patch<Task>(`/api/tasks/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/api/tasks/${id}`),
};
