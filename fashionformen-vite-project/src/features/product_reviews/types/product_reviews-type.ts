// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  ProductReviewsResponse,
  ProductReviewsRequest,
  ApiResponseListProductReviewsResponse,
  ApiResponseProductReviewsResponse,
} from '@/api-generated/api';



// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface ProductReviewsState {
  list: import('@/api-generated/api').ProductReviewsResponse[];
  selected: import('@/api-generated/api').ProductReviewsResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
