import { ProductVariantsControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductVariant, ProductVariantRequest } from '../types/product-variant-type';

const api = new ProductVariantsControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const productVariantApi = {
  getAll: async (): Promise<ProductVariant[]> => {
    const response = await api.getAll2();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<ProductVariant> => {
    const response = await api.getById3(id);
    return (response.data as any).data;
  },
  create: async (data: ProductVariantRequest): Promise<ProductVariant> => {
    const response = await api.create3(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: ProductVariantRequest): Promise<ProductVariant> => {
    const response = await api.update3(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete3(id);
  }
};
