import type {
  BrandUpsertRequest as BrandRequest,
  BrandResponse as Brand,
} from '@/api-generated/api';

export type { BrandRequest, Brand };


export interface BrandState {
  list: Brand[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

