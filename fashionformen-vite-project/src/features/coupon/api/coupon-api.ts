import { AdminCouponControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { CouponCreateRequest, CouponUpdateRequest } from '../types/coupon-type';

const api = new AdminCouponControllerApi(undefined, axiosClient.defaults.baseURL, axiosClient as any);

export const couponApi = {
  getAll: async () => (await api.getAll7()).data.data ?? [],
  getById: async (id: number) => (await api.getById7(id)).data.data,
  create: async (body: CouponCreateRequest) => (await api.create7(body)).data.data,
  update: async (id: number, body: CouponUpdateRequest) => (await api.update7(id, body)).data.data,
  delete: async (id: number) => { await api.delete7(id); },
};
