import { axiosClient } from '@/shared/lib/axios';
import type { ProductReview, ProductReviewRequest, ProductReviewListResponse, ProductReviewItemResponse } from '../types/product-review-type';

export const productReviewApi = {
  getAll: async (): Promise<ProductReview[]> => {
    const response = await axiosClient.get<ProductReviewListResponse>('/api/product-reviews');
    return response.data.data;
  },
  getById: async (id: number): Promise<ProductReview> => {
    const response = await axiosClient.get<ProductReviewItemResponse>(`/api/product-reviews/${id}`);
    return response.data.data;
  },
  create: async (data: ProductReviewRequest): Promise<ProductReview> => {
    const response = await axiosClient.post<ProductReviewItemResponse>('/api/product-reviews', data);
    return response.data.data;
  },
  update: async (id: number, data: ProductReviewRequest): Promise<ProductReview> => {
    const response = await axiosClient.put<ProductReviewItemResponse>(`/api/product-reviews/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/product-reviews/${id}`);
  }
};
