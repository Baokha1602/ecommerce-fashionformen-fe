export type { BrandResponse, BrandUpsertRequest } from '@/api-generated/api';

import type { BrandResponse } from '@/api-generated/api';

export interface BrandsState {
  list: BrandResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
