// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  ProductImagesResponse,
  ProductImagesRequest,
  ApiResponseListProductImagesResponse,
  ApiResponseProductImagesResponse,
} from '@/api-generated/api';



// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface ProductImagesState {
  list: import('@/api-generated/api').ProductImagesResponse[];
  selected: import('@/api-generated/api').ProductImagesResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
