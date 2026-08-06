import { RankControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { RankResponse, RankUpsertRequest } from '../types/ranks-type';

// Khởi tạo API instance với axiosClient đã có auth interceptor
const apiInstance = new RankControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const ranksApi = {
  getAllRanks: async (): Promise<RankResponse[]> => {
    const response = await apiInstance.getAll2();
    return (response.data as any).data ?? [];
  },

  /** Lấy chi tiết 1 hạng theo ID */
  getRankById: async (id: number): Promise<RankResponse> => {
    const response = await apiInstance.getById2(id);
    return (response.data as any).data;
  },

  /** Tạo hạng mới */
  createRank: async (body: RankUpsertRequest): Promise<RankResponse> => {
    const response = await apiInstance.create2(body);
    return (response.data as any).data;
  },

  /** Cập nhật toàn bộ hạng (PUT) */
  updateRank: async (id: number, body: RankUpsertRequest): Promise<RankResponse> => {
    const response = await apiInstance.update2(id, body);
    return (response.data as any).data;
  },

  /** Cập nhật 1 phần hạng (PATCH) */
  patchRank: async (id: number, body: RankUpsertRequest): Promise<RankResponse> => {
    const response = await apiInstance.patch(id, body);
    return (response.data as any).data;
  },

  /** Xóa hạng theo ID */
  deleteRank: async (id: number): Promise<void> => {
    await apiInstance.delete2(id);
  },
};
