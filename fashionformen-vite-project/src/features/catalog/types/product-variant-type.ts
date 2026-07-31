import type {
  ProductVariantRequest as ProductVariantRequest,
  ProductVariantResponse as ProductVariant,
} from '@/api-generated/api';

export type { ProductVariantRequest, ProductVariant };


export interface ProductVariantState {
  list: ProductVariant[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

