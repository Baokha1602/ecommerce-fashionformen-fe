import type {
  CategoryUpsertRequest as CategoryRequest,
  CategoryResponse as Category,
} from '@/api-generated/api';

export type { CategoryRequest, Category };


export interface CategoryState {
  list: Category[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

