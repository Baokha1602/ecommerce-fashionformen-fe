import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface ProductImage {
  id: number;
  productId: number;
  image: string;
  isMainImage: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImageRequest {
  productId: number;
  image: string;
  isMainImage: boolean;
}

export type ProductImageListResponse = ApiResponse<ProductImage[]>;
export type ProductImageItemResponse = ApiResponse<ProductImage>;
