import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewRequest {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

export type ProductReviewListResponse = ApiResponse<ProductReview[]>;
export type ProductReviewItemResponse = ApiResponse<ProductReview>;
