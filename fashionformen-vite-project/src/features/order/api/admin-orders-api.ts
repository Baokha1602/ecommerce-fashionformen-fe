import { AdminOrderControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { 
  Pageable, 
  OrderStatusUpdateRequest, 
  GetAllOrdersOrderStatusEnum, 
  GetAllOrdersPaymentMethodEnum 
} from '../types/admin-orders-type';

const api = new AdminOrderControllerApi(undefined, axiosClient.defaults.baseURL, axiosClient as any);

export const adminOrdersApi = {
  getAllOrders: async (
    pageable: Pageable, 
    orderStatus?: GetAllOrdersOrderStatusEnum, 
    paymentMethod?: GetAllOrdersPaymentMethodEnum, 
    dateFrom?: string, 
    dateTo?: string
  ) => {
    const res = await api.getAllOrders(pageable, orderStatus, paymentMethod, dateFrom, dateTo);
    return res.data.data;
  },
  
  getOrderDetail: async (orderId: number) => {
    const res = await api.getOrderDetail(orderId);
    return res.data.data;
  },
  
  updateOrderStatus: async (orderId: number, body: OrderStatusUpdateRequest) => {
    const res = await api.updateOrderStatus(orderId, body);
    return res.data.data;
  },
  
  getOrderStats: async (dateFrom?: string, dateTo?: string) => {
    const res = await api.getOrderStats(dateFrom, dateTo);
    return res.data.data;
  },
};
