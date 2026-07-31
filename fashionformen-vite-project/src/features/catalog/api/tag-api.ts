import { TagControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type { Tag, TagRequest } from '../types/tag-type';

const api = new TagControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const tagApi = {
  getAll: async (): Promise<Tag[]> => {
    const response = await api.getAll();
    return (response.data as any).data ?? [];
  },
  getById: async (id: number): Promise<Tag> => {
    const response = await api.getById1(id);
    return (response.data as any).data;
  },
  create: async (data: TagRequest): Promise<Tag> => {
    const response = await api.create1(data as any);
    return (response.data as any).data;
  },
  update: async (id: number, data: TagRequest): Promise<Tag> => {
    const response = await api.update1(id, data as any);
    return (response.data as any).data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete1(id);
  }
};

