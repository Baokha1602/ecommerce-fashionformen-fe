import { axiosClient } from '@/shared/lib/axios';
import type { Product, ProductRequest, ProductListResponse, ProductItemResponse } from '../types/product-type';

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosClient.get<ProductListResponse>('/api/products');
    return response.data.data;
  },
  getById: async (id: number): Promise<Product> => {
    const response = await axiosClient.get<ProductItemResponse>(`/api/products/${id}`);
    return response.data.data;
  },
  create: async (data: ProductRequest): Promise<Product> => {
    const response = await axiosClient.post<ProductItemResponse>('/api/products', data);
    return response.data.data;
  },
  update: async (id: number, data: ProductRequest): Promise<Product> => {
    const response = await axiosClient.put<ProductItemResponse>(`/api/products/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/products/${id}`);
  }
};
