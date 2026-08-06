import { BannerControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { BannerResponse, BannerUpsertRequest } from '../types/banners-type';

const apiInstance = new BannerControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const bannersApi = {
  getAll: async (): Promise<BannerResponse[]> => {
    const response = await apiInstance.getAll6();
    return (response.data as any).data ?? [];
  },

  getById: async (id: number): Promise<BannerResponse> => {
    const response = await apiInstance.getById6(id);
    return (response.data as any).data;
  },

  create: async (body: BannerUpsertRequest): Promise<BannerResponse> => {
    const response = await apiInstance.create6(body);
    return (response.data as any).data;
  },

  update: async (id: number, body: BannerUpsertRequest): Promise<BannerResponse> => {
    const response = await apiInstance.update6(id, body);
    return (response.data as any).data;
  },

  delete: async (id: number): Promise<void> => {
    await apiInstance.delete6(id);
  },
};
