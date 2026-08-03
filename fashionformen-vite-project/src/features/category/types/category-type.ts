// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  CategoryResponse,
  CategoryUpsertRequest,
  ApiResponseListCategoryResponse,
  ApiResponseCategoryResponse,
} from '@/api-generated/api';

// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface CategoryState {
  list: import('@/api-generated/api').CategoryResponse[];
  selected: import('@/api-generated/api').CategoryResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
