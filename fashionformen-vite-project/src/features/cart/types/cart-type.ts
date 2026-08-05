export type { 
  CartResponse, 
  CartItemRequest, 
  CartItemResponse, 
  ApiResponseCartResponse 
} from '@/api-generated/api';

export interface CartState {
  cartDetails: import('@/api-generated/api').CartResponse | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
