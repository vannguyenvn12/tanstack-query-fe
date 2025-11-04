import axiosClient from './axiosClient';
import type { Project } from '../types';

export const projectsApi = {
  getAll: () => axiosClient.get<Project[]>('/api/projects'),
  getById: (id: number) => axiosClient.get<Project>(`/api/projects/${id}`),
  create: (data: Omit<Project, 'id'>) =>
    axiosClient.post<Project>('/api/projects', data),
  update: (id: number, data: Partial<Omit<Project, 'id'>>) =>
    axiosClient.patch<Project>(`/api/projects/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/api/projects/${id}`),
};
