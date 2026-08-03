import { axiosClient } from '@/shared/lib/axios';
import type { Brand, BrandRequest, BrandListResponse, BrandItemResponse } from '../types/brand-type';

export const brandApi = {
  getAll: async (): Promise<Brand[]> => {
    const response = await axiosClient.get<BrandListResponse>('/api/brands');
    return response.data.data;
  },
  getById: async (id: number): Promise<Brand> => {
    const response = await axiosClient.get<BrandItemResponse>(`/api/brands/${id}`);
    return response.data.data;
  },
  create: async (data: BrandRequest): Promise<Brand> => {
    const response = await axiosClient.post<BrandItemResponse>('/api/brands', data);
    return response.data.data;
  },
  update: async (id: number, data: BrandRequest): Promise<Brand> => {
    const response = await axiosClient.put<BrandItemResponse>(`/api/brands/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/brands/${id}`);
  }
};
