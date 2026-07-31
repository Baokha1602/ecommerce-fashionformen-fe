import type {
  ProductImagesRequest as ProductImageRequest,
  ProductImagesResponse as ProductImage,
} from '@/api-generated/api';

export type { ProductImageRequest, ProductImage };


// Các type thuần FE (nếu dùng Redux sau này)
export interface ProductImageState {
  list: ProductImage[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
