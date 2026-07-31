import type {
  ProductRequest as ProductRequest,
  ProductResponse as Product,
} from '@/api-generated/api';

export type { ProductRequest, Product };


export interface ProductState {
  list: Product[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

