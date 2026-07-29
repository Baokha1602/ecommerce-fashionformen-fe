import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface ProductTag {
  id: number;
  productId: number;
  tagId: number;
  createdAt: string;
}

export interface ProductTagRequest {
  productId: number;
  tagId: number;
}

export type ProductTagListResponse = ApiResponse<ProductTag[]>;
export type ProductTagItemResponse = ApiResponse<ProductTag>;
