// @ts-nocheck
import { ProductVariantsControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { ProductVariantResponse, ProductVariantRequest } from '../types/product_variants-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new ProductVariantsControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const product_variantsApi = {
  /** Lấy danh sách tất cả hạng thành viên */
  getAllProductVariants: async (): Promise<ProductVariantResponse[]> => {
    const response = await apiInstance.getAllProductVariant();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 hạng theo ID */
  getProductVariantById: async (id: number): Promise<ProductVariantResponse> => {
    const response = await apiInstance.getProductVariantById(id);
    return (response.data as any).data;
  },

  /** Tạo hạng mới */
  createProductVariant: async (body: ProductVariantRequest): Promise<ProductVariantResponse> => {
    const response = await apiInstance.createProductVariant(body);
    return (response.data as any).data;
  },

  /** Cập nhật toàn bộ hạng (PUT) */
  updateProductVariant: async (id: number, body: ProductVariantRequest): Promise<ProductVariantResponse> => {
    const response = await apiInstance.updateProductVariant(id, body);
    return (response.data as any).data;
  },

  /** Cập nhật 1 phần hạng (PATCH) */
  patchProductVariant: async (id: number, body: ProductVariantRequest): Promise<ProductVariantResponse> => {
    const response = await apiInstance.patch(id, body);
    return (response.data as any).data;
  },

  /** Xóa hạng theo ID */
  deleteProductVariant: async (id: number): Promise<void> => {
    await apiInstance.deleteProductVariant(id);
  },
};
