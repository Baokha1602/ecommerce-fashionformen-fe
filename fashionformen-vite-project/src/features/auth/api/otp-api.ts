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
  
    sendOtp: builder.mutation<ApiResponseVoid, OtpSendRequest>({
      query: (body) => ({
        url: '/api/auth/otp/send',
        method: 'POST',
        data: body,
      }),
    }),

   
    verifyOtp: builder.mutation<ApiResponseOtpResponse, OtpVerifyRequest>({
      query: (body) => ({
        url: '/api/auth/otp/verify',
        method: 'POST',
        data: body,
      }),
    }),

    
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
