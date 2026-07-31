import { ProductReviewsControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductReview, ProductReviewRequest } from '../types/product-review-type';

const api = new ProductReviewsControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const productReviewApi = {
  getAll: async (): Promise<ProductReview[]> => {
    const response = await api.getAllProductReviewss();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<ProductReview> => {
    const response = await api.getProductReviewsById(id);
    return (response.data as any).data;
  },
  create: async (data: ProductReviewRequest): Promise<ProductReview> => {
    const response = await api.createProductReviews(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: ProductReviewRequest): Promise<ProductReview> => {
    const response = await api.updateProductReviews(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.deleteProductReviews(id);
  }
};

