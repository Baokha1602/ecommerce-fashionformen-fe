import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosClient } from './axios';

/**
 * RTK Query baseQuery wrapper cho axiosClient.
 * Tái dụng toàn bộ interceptor (auth, refresh token) đã cấu hình trong axiosClient.
 */
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = {}
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: unknown;
      params?: unknown;
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    { status?: number; message?: string; data?: unknown }
  > =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosClient({
        url: baseUrl ? `${baseUrl}${url}` : url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<any>;
      return {
        error: {
          status: err.response?.status,
          message:
            err.response?.data?.message ||
            err.message ||
            'Có lỗi xảy ra, vui lòng thử lại.',
          data: err.response?.data,
        },
      };
    }
  };
