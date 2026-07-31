// @ts-nocheck
import { ProductImagesControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductImagesResponse, ProductImagesRequest } from '../types/product_images-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new ProductImagesControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const product_imagesApi = {
  /** Lấy danh sách tất cả hạng thành viên */
  getAllProductImages: async (): Promise<ProductImagesResponse[]> => {
    const response = await apiInstance.getAllProductImages();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 hạng theo ID */
  getProductImageById: async (id: number): Promise<ProductImagesResponse> => {
    const response = await apiInstance.getProductImagesById(id);
    return (response.data as any).data;
  },

  /** Tạo hạng mới */
  createProductImage: async (body: ProductImagesRequest): Promise<ProductImagesResponse> => {
    const response = await apiInstance.createProductImages(body);
    return (response.data as any).data;
  },

  /** Cập nhật toàn bộ hạng (PUT) */
  updateProductImage: async (id: number, body: ProductImagesRequest): Promise<ProductImagesResponse> => {
    const response = await apiInstance.updateProductImages(id, body);
    return (response.data as any).data;
  },

  /** Cập nhật 1 phần hạng (PATCH) */
  patchProductImage: async (id: number, body: ProductImagesRequest): Promise<ProductImagesResponse> => {
    const response = await apiInstance.patch(id, body);
    return (response.data as any).data;
  },

  /** Xóa hạng theo ID */
  deleteProductImage: async (id: number): Promise<void> => {
    await apiInstance.deleteProductImages(id);
  },
};
