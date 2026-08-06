// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  ProductResponse,
  ProductRequest,
  ApiResponseListProductResponse,
  ApiResponseProductResponse,
} from '@/api-generated/api';



// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface ProductsState {
  list: import('@/api-generated/api').ProductResponse[];
  selected: import('@/api-generated/api').ProductResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
