import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi, paymentApiFuncs } from '../api/order-api';
import { type OrderCreateRequest, type Pageable } from '@/api-generated/api';

export const fetchOrderHistoryThunk = createAsyncThunk(
  'order/fetchOrderHistory',
  async (pageable: Pageable | undefined, { rejectWithValue }) => {
    try {
      const data = await orderApi.getOrderHistory(pageable);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi lấy lịch sử đơn hàng');
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (body: OrderCreateRequest, { rejectWithValue }) => {
    try {
      const data = await orderApi.createOrder(body);
      return data;
    } catch (error: any) {
      let detailedError = error?.response?.data?.message || 'Lỗi tạo đơn hàng';
      const validationData = error?.response?.data?.data;
      if (validationData && typeof validationData === 'object' && Object.keys(validationData).length > 0) {
        const fieldErrors = Object.entries(validationData).map(([field, msg]) => `${field}: ${msg}`).join(', ');
        detailedError = `${detailedError} (${fieldErrors})`;
      }
      console.error('Lỗi tạo đơn hàng chi tiết:', error?.response?.data || error);
      return rejectWithValue(detailedError);
    }
  }
);

export const cancelOrderThunk = createAsyncThunk(
  'order/cancelOrder',
  async (orderId: number, { rejectWithValue }) => {
    try {
      await orderApi.cancelOrder(orderId);
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi hủy đơn hàng');
    }
  }
);

export const createMoMoUrlThunk = createAsyncThunk(
  'order/createMoMoUrl',
  async (orderId: number, { rejectWithValue }) => {
    try {
      const data = await orderApi.createMoMoUrl(orderId);
      return data as unknown as string;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi tạo link thanh toán MoMo');
    }
  }
);

export const createVnPayUrlThunk = createAsyncThunk(
  'order/createVnPayUrl',
  async (orderId: number, { rejectWithValue }) => {
    try {
      const data = await orderApi.createVnPayUrl(orderId);
      return data as unknown as string;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi tạo link thanh toán VNPay');
    }
  }
);

export const verifyVnPayReturnThunk = createAsyncThunk(
  'payment/verifyVnPayReturn',
  async (params: { [key: string]: string }, { rejectWithValue }) => {
    try {
      const data = await paymentApiFuncs.vnPayReturn(params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi xác minh thanh toán VNPay');
    }
  }
);
