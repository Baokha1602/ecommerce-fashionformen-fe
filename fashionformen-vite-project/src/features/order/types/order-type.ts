export type { 
  OrderResponse, 
  OrderCreateRequest,
  PageOrderResponse,
  OrderAdminResponse
} from '@/api-generated/api';

export interface OrderState {
  historyList: import('@/api-generated/api').OrderResponse[];
  totalPages: number;
  totalElements: number;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  paymentUrl: string | null;
}
