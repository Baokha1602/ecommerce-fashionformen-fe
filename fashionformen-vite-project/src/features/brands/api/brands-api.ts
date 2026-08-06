import { BrandControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { BrandResponse, BrandUpsertRequest } from '../types/brands-type';

const apiInstance = new BrandControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const brandsApi = {
  getAll: async (): Promise<BrandResponse[]> => {
    const response = await apiInstance.getAll5();
    return (response.data as any).data ?? [];
  },

  getById: async (id: number): Promise<BrandResponse> => {
    const response = await apiInstance.getById5(id);
    return (response.data as any).data;
  },

  create: async (body: BrandUpsertRequest): Promise<BrandResponse> => {
    const response = await apiInstance.create5(body);
    return (response.data as any).data;
  },

  update: async (id: number, body: BrandUpsertRequest): Promise<BrandResponse> => {
    const response = await apiInstance.update5(id, body);
    return (response.data as any).data;
  },

  delete: async (id: number): Promise<void> => {
    await apiInstance.delete5(id);
  },
};
