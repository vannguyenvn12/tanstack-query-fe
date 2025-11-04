import axiosClient from './axiosClient';
import type { Task } from '../types';

export const tasksApi = {
  getAll: () => axiosClient.get<Task[]>('/api/tasks'),
  getById: (id: number) => axiosClient.get<Task>(`/api/tasks/${id}`),
  getByProjectId: (projectId: number) =>
    axiosClient.get<Task[]>(`/api/projects/${projectId}/tasks`),
  create: (data: Omit<Task, 'id'>) => axiosClient.post<Task>('/api/tasks', data),
  update: (id: number, data: Partial<Omit<Task, 'id'>>) =>
    axiosClient.patch<Task>(`/api/tasks/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/api/tasks/${id}`),
};

