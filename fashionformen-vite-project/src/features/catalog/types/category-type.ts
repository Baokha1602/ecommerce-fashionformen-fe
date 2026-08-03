import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRequest {
  name: string;
  description?: string;
}

export type CategoryListResponse = ApiResponse<Category[]>;
export type CategoryItemResponse = ApiResponse<Category>;
