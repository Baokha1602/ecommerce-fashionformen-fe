import { axiosClient } from '@/shared/lib/axios';
import { ensureArray } from '@/shared/lib/ensure-array';
import type { UserResponse } from '../types/users-type';

export const usersApi = {
  getAll: async (): Promise<UserResponse[]> => {
    const response = await axiosClient.get('/api/users');
    return ensureArray<UserResponse>(response.data);
  },

  getById: async (id: number): Promise<UserResponse> => {
    const response = await axiosClient.get(`/api/users/${id}`);
    const resData = response.data;
    return (resData as any)?.data ?? resData;
  },

  toggleActive: async (id: number): Promise<UserResponse> => {
    const response = await axiosClient.patch(`/api/users/${id}/toggle-active`);
    const resData = response.data;
    return (resData as any)?.data ?? resData;
  },
};
