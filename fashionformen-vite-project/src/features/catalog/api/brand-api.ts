import { BrandControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { Brand, BrandRequest } from '../types/brand-type';

const api = new BrandControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const brandApi = {
  getAll: async (): Promise<Brand[]> => {
    const response = await api.getAll4();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<Brand> => {
    const response = await api.getById5(id);
    return (response.data as any).data;
  },
  create: async (data: BrandRequest): Promise<Brand> => {
    const response = await api.create5(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: BrandRequest): Promise<Brand> => {
    const response = await api.update5(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete5(id);
  }
};
