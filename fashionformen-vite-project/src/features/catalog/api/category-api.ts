import { CategoryControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { Category, CategoryRequest } from '../types/category-type';

const api = new CategoryControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.getAll3();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<Category> => {
    const response = await api.getById4(id);
    return (response.data as any).data;
  },
  create: async (data: CategoryRequest): Promise<Category> => {
    const response = await api.create4(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: CategoryRequest): Promise<Category> => {
    const response = await api.update4(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete4(id);
  }
};
