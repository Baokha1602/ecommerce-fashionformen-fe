import { axiosClient } from '@/shared/lib/axios';
import type { ProductTag, ProductTagRequest, ProductTagListResponse, ProductTagItemResponse } from '../types/product-tag-type';

export const productTagApi = {
  getAll: async (): Promise<ProductTag[]> => {
    const response = await axiosClient.get<ProductTagListResponse>('/api/product-tags');
    return response.data.data;
  },
  getById: async (id: number): Promise<ProductTag> => {
    const response = await axiosClient.get<ProductTagItemResponse>(`/api/product-tags/${id}`);
    return response.data.data;
  },
  create: async (data: ProductTagRequest): Promise<ProductTag> => {
    const response = await axiosClient.post<ProductTagItemResponse>('/api/product-tags', data);
    return response.data.data;
  },
  update: async (id: number, data: ProductTagRequest): Promise<ProductTag> => {
    const response = await axiosClient.put<ProductTagItemResponse>(`/api/product-tags/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/product-tags/${id}`);
  }
};
