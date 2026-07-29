import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface Brand {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BrandRequest {
  name: string;
  description?: string;
}

export type BrandListResponse = ApiResponse<Brand[]>;
export type BrandItemResponse = ApiResponse<Brand>;
