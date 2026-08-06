import { OrderControllerApi, PaymentControllerApi, type OrderCreateRequest, type Pageable } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';

const api = new OrderControllerApi(undefined, axiosClient.defaults.baseURL, axiosClient as any);
const paymentApi = new PaymentControllerApi(undefined, axiosClient.defaults.baseURL, axiosClient as any);

export const orderApi = {
  createOrder: async (body: OrderCreateRequest) => (await api.createOrder(body)).data.data,
  getOrderHistory: async (pageable?: Pageable) => (await api.getOrderHistory(pageable ?? {})).data.data,
  getOrderDetails: async (orderId: number) => (await api.getOrderDetails(orderId)).data.data,
  cancelOrder: async (orderId: number) => { await api.cancelOrder(orderId); },
  createMoMoUrl: async (orderId: number) => (await api.createMoMoUrl(orderId)).data.data,
  createVnPayUrl: async (orderId: number) => (await api.createVnPayUrl(orderId)).data.data,
};

export const paymentApiFuncs = {
  vnPayReturn: async (params: { [key: string]: string }) => (await paymentApi.vnPayReturn(params)).data.data,
};
