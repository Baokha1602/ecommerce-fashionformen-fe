import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface ProductVariant {
  id: number;
  productId: number;
  productName?: string;
  name: string;
  price: number;
  discountPrice: number | null;
  discountRate: number | null;
  stockTotal: number;
  stockLock: number;
  attributes?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariantRequest {
  productId: number;
  name: string;
  price: number;
  discountPrice?: number;
  discountRate?: number;
  stockTotal: number;
  stockLock?: number;
  attributeValueIds?: number[];
}

export type ProductVariantListResponse = ApiResponse<ProductVariant[]>;
export type ProductVariantItemResponse = ApiResponse<ProductVariant>;
