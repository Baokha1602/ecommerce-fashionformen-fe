import { axiosClient } from '@/shared/lib/axios';
import type { Category, CategoryRequest, CategoryListResponse, CategoryItemResponse } from '../types/category-type';

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await axiosClient.get<CategoryListResponse>('/api/categories');
    return response.data.data;
  },
  getById: async (id: number): Promise<Category> => {
    const response = await axiosClient.get<CategoryItemResponse>(`/api/categories/${id}`);
    return response.data.data;
  },
  create: async (data: CategoryRequest): Promise<Category> => {
    const response = await axiosClient.post<CategoryItemResponse>('/api/categories', data);
    return response.data.data;
  },
  update: async (id: number, data: CategoryRequest): Promise<Category> => {
    const response = await axiosClient.put<CategoryItemResponse>(`/api/categories/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/categories/${id}`);
  }
};
