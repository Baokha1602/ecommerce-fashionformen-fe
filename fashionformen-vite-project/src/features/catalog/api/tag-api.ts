import { axiosClient } from '@/shared/lib/axios';
import type { Tag, TagRequest, TagListResponse, TagItemResponse } from '../types/tag-type';

export const tagApi = {
  getAll: async (): Promise<Tag[]> => {
    const response = await axiosClient.get<TagListResponse>('/api/tags');
    return response.data.data;
  },
  getById: async (id: number): Promise<Tag> => {
    const response = await axiosClient.get<TagItemResponse>(`/api/tags/${id}`);
    return response.data.data;
  },
  create: async (data: TagRequest): Promise<Tag> => {
    const response = await axiosClient.post<TagItemResponse>('/api/tags', data);
    return response.data.data;
  },
  update: async (id: number, data: TagRequest): Promise<Tag> => {
    const response = await axiosClient.put<TagItemResponse>(`/api/tags/${id}`, data);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/tags/${id}`);
  }
};
