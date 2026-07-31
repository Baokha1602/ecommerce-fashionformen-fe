import type { ApiResponse } from '@/features/auth/types/auth-type';

export interface Tag {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TagRequest {
  name: string;
  description?: string;
}

export type TagListResponse = ApiResponse<Tag[]>;
export type TagItemResponse = ApiResponse<Tag>;
