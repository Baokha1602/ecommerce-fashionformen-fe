// @ts-nocheck
import { ProductReviewsControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductReviewsResponse, ProductReviewsRequest } from '../types/product_reviews-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new ProductReviewsControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const product_reviewsApi = {
  /** Lấy danh sách tất cả hạng thành viên */
  getAllProductReviews: async (): Promise<ProductReviewsResponse[]> => {
    const response = await apiInstance.getAllProductReviews();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 hạng theo ID */
  getProductReviewById: async (id: number): Promise<ProductReviewsResponse> => {
    const response = await apiInstance.getProductReviewsById(id);
    return (response.data as any).data;
  },

  /** Tạo hạng mới */
  createProductReview: async (body: ProductReviewsRequest): Promise<ProductReviewsResponse> => {
    const response = await apiInstance.createProductReviews(body);
    return (response.data as any).data;
  },

  /** Cập nhật toàn bộ hạng (PUT) */
  updateProductReview: async (id: number, body: ProductReviewsRequest): Promise<ProductReviewsResponse> => {
    const response = await apiInstance.updateProductReviews(id, body);
    return (response.data as any).data;
  },

  /** Cập nhật 1 phần hạng (PATCH) */
  patchProductReview: async (id: number, body: ProductReviewsRequest): Promise<ProductReviewsResponse> => {
    const response = await apiInstance.patch(id, body);
    return (response.data as any).data;
  },

  /** Xóa hạng theo ID */
  deleteProductReview: async (id: number): Promise<void> => {
    await apiInstance.deleteProductReviews(id);
  },
};
