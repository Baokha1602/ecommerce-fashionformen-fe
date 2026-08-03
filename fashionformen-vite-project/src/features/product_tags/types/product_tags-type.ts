// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  ProductTagResponse,
  ProductTagRequest,
  ApiResponseListProductTagResponse,
  ApiResponseProductTagResponse,
} from '@/api-generated/api';



// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface ProductTagsState {
  list: import('@/api-generated/api').ProductTagResponse[];
  selected: import('@/api-generated/api').ProductTagResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
