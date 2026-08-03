import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  price: number;
  discountPrice: number | null;
  stockQuantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariantRequest {
  productId: number;
  sku: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  status: string;
}

export type ProductVariantListResponse = ApiResponse<ProductVariant[]>;
export type ProductVariantItemResponse = ApiResponse<ProductVariant>;
