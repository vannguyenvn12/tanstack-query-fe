import axiosClient from './axiosClient';
import type { User } from '../types';

export const usersApi = {
  getAll: () => axiosClient.get<User[]>('/api/users'),
  getById: (id: number) => axiosClient.get<User>(`/api/users/${id}`),
};

