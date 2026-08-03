import { axiosClient } from '@/shared/lib/axios';
import type { ProductImage, ProductImageRequest, ProductImageListResponse, ProductImageItemResponse } from '../types/product-image-type';

export const productImageApi = {
  getAll: async (): Promise<ProductImage[]> => {
    const response = await axiosClient.get<ProductImageListResponse>('/api/product-images');
    return response.data.data;
  },
  getById: async (id: number): Promise<ProductImage> => {
    const response = await axiosClient.get<ProductImageItemResponse>(`/api/product-images/${id}`);
    return response.data.data;
  },
  create: async (data: ProductImageRequest): Promise<ProductImage> => {
    const response = await axiosClient.post<ProductImageItemResponse>('/api/product-images', data);
    return response.data.data;
  },
  update: async (id: number, data: ProductImageRequest): Promise<ProductImage> => {
    const response = await axiosClient.put<ProductImageItemResponse>(`/api/product-images/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/product-images/${id}`);
  }
};
