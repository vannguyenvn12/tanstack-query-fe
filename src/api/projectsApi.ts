import axiosClient from './axiosClient';
import type { IPaginateCursor, Project } from '../types';

export const projectsApi = {
  getAll: () => axiosClient.get<Project[]>('/api/projects'),
  getAllCursor: (cursor: string | null, limit = 15) =>
    axiosClient.get<IPaginateCursor<Project>>('/api/projects/pagination', {
      params: { cursor, limit },
    }),
  getById: (id: number) => axiosClient.get<Project>(`/api/projects/${id}`),
  getByUserId: (userId: number) =>
    axiosClient.get<Project[]>(`/api/projects/users/${userId}`),
  create: (data: Omit<Project, 'id'>) =>
    axiosClient.post<Project>('/api/projects', data),
  update: (id: number, data: Partial<Omit<Project, 'id'>>) =>
    axiosClient.patch<Project>(`/api/projects/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/api/projects/${id}`),
};
