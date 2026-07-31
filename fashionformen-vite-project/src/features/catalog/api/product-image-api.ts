import { ProductImagesControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductImage, ProductImageRequest } from '../types/product-image-type';

const api = new ProductImagesControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const productImageApi = {
  getAll: async (): Promise<ProductImage[]> => {
    const response = await api.getAllProductImagess();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<ProductImage> => {
    const response = await api.getProductImagesById(id);
    return (response.data as any).data;
  },
  create: async (data: ProductImageRequest): Promise<ProductImage> => {
    const response = await api.createProductImages(data);
    return (response.data as any).data;
  },
  update: async (id: number, data: ProductImageRequest): Promise<ProductImage> => {
    const response = await api.updateProductImages(id, data);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.deleteProductImages(id);
  }
};
