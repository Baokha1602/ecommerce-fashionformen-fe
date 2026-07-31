import { ProductControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { Product, ProductRequest } from '../types/product-type';

const api = new ProductControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.getAllProducts();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<Product> => {
    const response = await api.getProductById(id);
    return (response.data as any).data;
  },
  create: async (data: ProductRequest): Promise<Product> => {
    const response = await api.createProduct(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: ProductRequest): Promise<Product> => {
    const response = await api.updateProduct(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.deleteProduct(id);
  }
};
