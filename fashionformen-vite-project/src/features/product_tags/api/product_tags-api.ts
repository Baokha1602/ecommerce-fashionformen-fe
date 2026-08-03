// @ts-nocheck
import { ProductTagControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductTagResponse, ProductTagRequest } from '../types/product_tags-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new ProductTagControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const product_tagsApi = {
  /** Lấy danh sách tất cả hạng thành viên */
  getAllProductTags: async (): Promise<ProductTagResponse[]> => {
    const response = await apiInstance.getAllProductTag();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 hạng theo ID */
  getProductTagById: async (id: number): Promise<ProductTagResponse> => {
    const response = await apiInstance.getProductTagById(id);
    return (response.data as any).data;
  },

  /** Tạo hạng mới */
  createProductTag: async (body: ProductTagRequest): Promise<ProductTagResponse> => {
    const response = await apiInstance.createProductTag(body);
    return (response.data as any).data;
  },

  /** Cập nhật toàn bộ hạng (PUT) */
  updateProductTag: async (id: number, body: ProductTagRequest): Promise<ProductTagResponse> => {
    const response = await apiInstance.updateProductTag(id, body);
    return (response.data as any).data;
  },

  /** Cập nhật 1 phần hạng (PATCH) */
  patchProductTag: async (id: number, body: ProductTagRequest): Promise<ProductTagResponse> => {
    const response = await apiInstance.patch(id, body);
    return (response.data as any).data;
  },

  /** Xóa hạng theo ID */
  deleteProductTag: async (id: number): Promise<void> => {
    await apiInstance.deleteProductTag(id);
  },
};
