import { GetAllOrdersOrderStatusEnum, GetAllOrdersPaymentMethodEnum } from '../types/admin-orders-type';

export const ADMIN_ORDERS_ROUTES = {
  ROOT: '/admin/orders',
} as const;

export const ORDER_STATUS_MAP: Record<GetAllOrdersOrderStatusEnum, { label: string; color: string }> = {
  [GetAllOrdersOrderStatusEnum.Pending]: { label: 'Chờ xử lý', color: '#faad14' },
  [GetAllOrdersOrderStatusEnum.Processing]: { label: 'Đang xử lý', color: '#1677ff' },
  [GetAllOrdersOrderStatusEnum.Delivering]: { label: 'Đang giao', color: '#52c41a' },
  [GetAllOrdersOrderStatusEnum.Delivered]: { label: 'Đã nhận', color: '#389e0d' },
  [GetAllOrdersOrderStatusEnum.Cancelled]: { label: 'Đã hủy', color: '#ff4d4f' },
};

export const PAYMENT_METHOD_MAP: Record<GetAllOrdersPaymentMethodEnum, { label: string; color: string }> = {
  [GetAllOrdersPaymentMethodEnum.Cod]: { label: 'COD (Thanh toán khi nhận hàng)', color: '#d9d9d9' },
  [GetAllOrdersPaymentMethodEnum.Momo]: { label: 'Ví MoMo', color: '#a10853' },
  [GetAllOrdersPaymentMethodEnum.VnPay]: { label: 'VNPay', color: '#005a9e' },
};
