import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/lib/axiosBaseQuery';
import type {
  OtpSendRequest,
  OtpVerifyRequest,
  ResetPasswordRequest,
  ApiResponseOtpResponse,
  ApiResponseVoid,
} from '@/api-generated/api';

export const otpApi = createApi({
  reducerPath: 'otpApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    /**
     * Bước 1: Gửi OTP về email
     * POST /api/auth/otp/send
     */
    sendOtp: builder.mutation<ApiResponseVoid, OtpSendRequest>({
      query: (body) => ({
        url: '/api/auth/otp/send',
        method: 'POST',
        data: body,
      }),
    }),

    /**
     * Bước 2: Xác minh OTP
     * POST /api/auth/otp/verify
     */
    verifyOtp: builder.mutation<ApiResponseOtpResponse, OtpVerifyRequest>({
      query: (body) => ({
        url: '/api/auth/otp/verify',
        method: 'POST',
        data: body,
      }),
    }),

    /**
     * Bước 3: Đặt lại mật khẩu
     * POST /api/auth/otp/reset-password
     */
    resetPassword: builder.mutation<ApiResponseVoid, ResetPasswordRequest>({
      query: (body) => ({
        url: '/api/auth/otp/reset-password',
        method: 'POST',
        data: body,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = otpApi;
