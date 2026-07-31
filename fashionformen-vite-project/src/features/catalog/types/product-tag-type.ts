import type {
  ProductTagRequest as ProductTagRequest,
  ProductTagResponse as ProductTag,
} from '@/api-generated/api';

export type { ProductTagRequest, ProductTag };


export interface ProductTagState {
  list: ProductTag[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

