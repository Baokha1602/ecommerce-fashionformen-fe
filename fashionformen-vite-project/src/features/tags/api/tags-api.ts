import { TagControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { TagResponse, TagCreateRequest, TagUpdateRequest } from '../types/tags-type';

const apiInstance = new TagControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const tagsApi = {
  getAll: async (): Promise<TagResponse[]> => {
    const response = await apiInstance.getAll();
    return (response.data as any).data ?? [];
  },

  getById: async (id: number): Promise<TagResponse> => {
    const response = await apiInstance.getById1(id);
    return (response.data as any).data;
  },

  create: async (body: TagCreateRequest): Promise<TagResponse> => {
    const response = await apiInstance.create1(body);
    return (response.data as any).data;
  },

  update: async (id: number, body: TagUpdateRequest): Promise<TagResponse> => {
    const response = await apiInstance.update1(id, body);
    return (response.data as any).data;
  },

  delete: async (id: number): Promise<void> => {
    await apiInstance.delete1(id);
  },
};
