export type { CouponResponse, CouponCreateRequest, CouponUpdateRequest } from '@/api-generated/api';
import type { CouponResponse } from '@/api-generated/api';

export interface CouponState {
  list: CouponResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
