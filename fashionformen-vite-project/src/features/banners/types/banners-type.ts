export type { BannerResponse, BannerUpsertRequest } from '@/api-generated/api';

import type { BannerResponse } from '@/api-generated/api';

export interface BannersState {
  list: BannerResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
