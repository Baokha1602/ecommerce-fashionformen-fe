import { UserAddressControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import type {
  UserAddressResponse,
  UserAddressCreateRequest,
  UserAddressUpdateRequest,
} from '../types/user_address-type';

const apiInstance = new UserAddressControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any,
);

export const userAddressApi = {
  getByUserId: async (userId: number): Promise<UserAddressResponse[]> => {
    const response = await apiInstance.getByUserId(userId);
    return (response.data as any).data ?? [];
  },

  getById: async (id: number): Promise<UserAddressResponse> => {
    const response = await apiInstance.getById(id);
    return (response.data as any).data;
  },

  create: async (body: UserAddressCreateRequest): Promise<UserAddressResponse> => {
    const response = await apiInstance.create(body);
    return (response.data as any).data;
  },

  update: async (id: number, body: UserAddressUpdateRequest): Promise<UserAddressResponse> => {
    const response = await apiInstance.update(id, body);
    return (response.data as any).data;
  },

  delete: async (id: number): Promise<void> => {
    await apiInstance._delete(id);
  },
};
