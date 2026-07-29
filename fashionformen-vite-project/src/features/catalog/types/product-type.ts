import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface Product {
  id: number;
  categoryId: number;
  brandId: number;
  name: string;
  description: string | null;
  soldQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  categoryId: number;
  brandId: number;
  name: string;
  description?: string;
}

export type ProductListResponse = ApiResponse<Product[]>;
export type ProductItemResponse = ApiResponse<Product>;
