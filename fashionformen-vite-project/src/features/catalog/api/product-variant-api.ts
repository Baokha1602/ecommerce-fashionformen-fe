import { axiosClient } from '@/shared/lib/axios';
import type { ProductVariant, ProductVariantRequest, ProductVariantListResponse, ProductVariantItemResponse } from '../types/product-variant-type';

export const productVariantApi = {
  getAll: async (): Promise<ProductVariant[]> => {
    const response = await axiosClient.get<ProductVariantListResponse>('/api/variants');
    return response.data.data;
  },
  getById: async (id: number): Promise<ProductVariant> => {
    const response = await axiosClient.get<ProductVariantItemResponse>(`/api/variants/${id}`);
    return response.data.data;
  },
  create: async (data: ProductVariantRequest): Promise<ProductVariant> => {
    const response = await axiosClient.post<ProductVariantItemResponse>('/api/variants', data);
    return response.data.data;
  },
  update: async (id: number, data: ProductVariantRequest): Promise<ProductVariant> => {
    const response = await axiosClient.put<ProductVariantItemResponse>(`/api/variants/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/variants/${id}`);
  }
};
