import { axiosClient } from '@/shared/lib/axios';
import { ensureArray } from '@/shared/lib/ensure-array';
import type { UserResponse, UserUpdateRequest } from '../types/users-type';

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

  getProfile: async (): Promise<UserResponse> => {
    const response = await axiosClient.get('/api/users/me');
    const resData = response.data;
    return (resData as any)?.data ?? resData;
  },

  update: async (id: number, data: UserUpdateRequest): Promise<UserResponse> => {
    const response = await axiosClient.put(`/api/users/${id}`, data);
    const resData = response.data;
    return (resData as any)?.data ?? resData;
  },

  updateProfile: async (data: UserUpdateRequest): Promise<UserResponse> => {
    const response = await axiosClient.put('/api/users/profile', data);
    const resData = response.data;
    return (resData as any)?.data ?? resData;
  },

  toggleActive: async (id: number, isActive: boolean): Promise<UserResponse> => {
    const response = await axiosClient.patch(`/api/users/${id}/status?isActive=${isActive}`);
    const resData = response.data;
    return (resData as any)?.data ?? resData;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/users/${id}`);
  },
};
