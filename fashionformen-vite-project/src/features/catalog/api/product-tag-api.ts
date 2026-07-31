import { ProductTagControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductTag, ProductTagRequest } from '../types/product-tag-type';

const api = new ProductTagControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const productTagApi = {
  getAll: async (): Promise<ProductTag[]> => {
    const response = await api.getAllProductTags();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<ProductTag> => {
    const response = await api.getProductTagById(id);
    return (response.data as any).data;
  },
  create: async (data: ProductTagRequest): Promise<ProductTag> => {
    const response = await api.createProductTag(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: ProductTagRequest): Promise<ProductTag> => {
    const response = await api.updateProductTag(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.deleteProductTag(id);
  }
};

