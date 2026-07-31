import { CategoryControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { CategoryResponse, CategoryUpsertRequest } from '../types/category-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new CategoryControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const categoryApi = {
  /** Lấy danh sách tất cả danh mục */
  getAllCategories: async (): Promise<CategoryResponse[]> => {
    const response = await apiInstance.getAll3();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 danh mục theo ID */
  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    const response = await apiInstance.getById4(id);
    return (response.data as any).data;
  },

  /** Tạo danh mục mới */
  createCategory: async (body: CategoryUpsertRequest): Promise<CategoryResponse> => {
    const response = await apiInstance.create4(body);
    return (response.data as any).data;
  },

  /** Cập nhật danh mục (PUT) */
  updateCategory: async (id: number, body: CategoryUpsertRequest): Promise<CategoryResponse> => {
    const response = await apiInstance.update4(id, body);
    return (response.data as any).data;
  },

  /** Xóa danh mục theo ID */
  deleteCategory: async (id: number): Promise<void> => {
    await apiInstance.delete4(id);
  },
};
