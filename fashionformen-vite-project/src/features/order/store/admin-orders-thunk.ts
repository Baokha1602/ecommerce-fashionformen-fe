import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminOrdersApi } from '../api/admin-orders-api';
import type { 
  Pageable, 
  OrderStatusUpdateRequest, 
  GetAllOrdersOrderStatusEnum, 
  GetAllOrdersPaymentMethodEnum 
} from '../types/admin-orders-type';

export const fetchAllAdminOrdersThunk = createAsyncThunk(
  'adminOrders/fetchAll',
  async (
    params: { 
      pageable: Pageable; 
      orderStatus?: GetAllOrdersOrderStatusEnum; 
      paymentMethod?: GetAllOrdersPaymentMethodEnum;
      dateFrom?: string;
      dateTo?: string;
    }, 
    { rejectWithValue }
  ) => {
    try {
      const { pageable, orderStatus, paymentMethod, dateFrom, dateTo } = params;
      const data = await adminOrdersApi.getAllOrders(pageable, orderStatus, paymentMethod, dateFrom, dateTo);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi lấy danh sách đơn hàng');
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  'adminOrders/updateStatus',
  async (
    params: { orderId: number; body: OrderStatusUpdateRequest }, 
    { rejectWithValue }
  ) => {
    try {
      const data = await adminOrdersApi.updateOrderStatus(params.orderId, params.body);
      return { orderId: params.orderId, data };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi cập nhật trạng thái đơn hàng');
    }
  }
);
