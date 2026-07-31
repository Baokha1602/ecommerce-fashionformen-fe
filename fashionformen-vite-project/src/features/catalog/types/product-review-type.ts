import type {
  ProductReviewsRequest as ProductReviewRequest,
  ProductReviewsResponse as ProductReview,
} from '@/api-generated/api';

export type { ProductReviewRequest, ProductReview };


export interface ProductReviewState {
  list: ProductReview[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

