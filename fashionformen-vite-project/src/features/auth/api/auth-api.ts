import { axiosClient } from '@/shared/lib/axios';
import type { LoginResponse, GetMeResponse, ApiResponse } from '../types/auth-type';

export const authApi = {
  login: async (credentials: any): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  },

  getMe: async (): Promise<GetMeResponse> => {
    const response = await axiosClient.get<GetMeResponse>('/api/auth/me');
    return response.data;
  },

  register: async (data: any): Promise<ApiResponse<any>> => {
    const response = await axiosClient.post<ApiResponse<any>>('/api/auth/register', data);
    return response.data;
  },
};
