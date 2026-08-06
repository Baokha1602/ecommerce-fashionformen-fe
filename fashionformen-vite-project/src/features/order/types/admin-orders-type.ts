export type { 
  OrderResponse, 
  OrderStatusUpdateRequest, 
  Pageable, 
  ApiResponsePageOrderResponse,
  OrderItemResponse,
  OrderStatsResponse
} from '@/api-generated/api';
export { GetAllOrdersOrderStatusEnum, GetAllOrdersPaymentMethodEnum, OrderStatusUpdateRequestNewStatusEnum } from '@/api-generated/api';
import type { OrderResponse } from '@/api-generated/api';

export interface AdminOrdersState {
  list: OrderResponse[];
  totalElements: number;
  totalPages: number;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
