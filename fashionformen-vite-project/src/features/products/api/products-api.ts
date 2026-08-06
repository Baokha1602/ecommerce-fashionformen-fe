// @ts-nocheck
import { ProductControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductResponse, ProductRequest } from '../types/products-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new ProductControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const productsApi = {
  /** Lấy danh sách tất cả hạng thành viên */
  getAllProducts: async (): Promise<ProductResponse[]> => {
    const response = await apiInstance.getAllProducts();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 hạng theo ID */
  getProductById: async (id: number): Promise<ProductResponse> => {
    const response = await apiInstance.getProductById(id);
    return (response.data as any).data;
  },

  /** Tạo hạng mới */
  createProduct: async (body: ProductRequest): Promise<ProductResponse> => {
    const response = await apiInstance.createProduct(body);
    return (response.data as any).data;
  },

  /** Cập nhật toàn bộ hạng (PUT) */
  updateProduct: async (id: number, body: ProductRequest): Promise<ProductResponse> => {
    const response = await apiInstance.updateProduct(id, body);
    return (response.data as any).data;
  },

  /** Cập nhật 1 phần hạng (PATCH) */
  patchProduct: async (id: number, body: ProductRequest): Promise<ProductResponse> => {
    const response = await apiInstance.patch(id, body);
    return (response.data as any).data;
  },

  /** Xóa hạng theo ID */
  deleteProduct: async (id: number): Promise<void> => {
    await apiInstance.deleteProduct(id);
  },
};
