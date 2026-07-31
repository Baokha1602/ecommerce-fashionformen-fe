// Re-export từ api-generated — KHÔNG định nghĩa lại
export type {
  RankResponse,
  RankUpsertRequest,
  ApiResponseListRankResponse,
  ApiResponseRankResponse,
} from '@/api-generated/api';

export {
  RankResponseRankNameEnum,
  RankUpsertRequestRankNameEnum,
} from '@/api-generated/api';

// ── Type thuần frontend (không có trong generated) ────────────────────────────

export interface RanksState {
  list: import('@/api-generated/api').RankResponse[];
  selected: import('@/api-generated/api').RankResponse | null;
  loading: boolean;
  submitting: boolean; // loading riêng cho create/update/delete
  error: string | null;
}
