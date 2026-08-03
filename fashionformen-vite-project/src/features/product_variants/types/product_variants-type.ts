// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  ProductVariantResponse,
  ProductVariantRequest,
  ApiResponseListProductVariantResponse,
  ApiResponseProductVariantResponse,
} from '@/api-generated/api';



// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface ProductVariantsState {
  list: import('@/api-generated/api').ProductVariantResponse[];
  selected: import('@/api-generated/api').ProductVariantResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
