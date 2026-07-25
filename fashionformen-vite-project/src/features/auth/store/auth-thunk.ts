import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/auth-api';
import type { User } from '../types/auth-type';

export const loginThunk = createAsyncThunk<User, any, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      const { accessToken, user } = response.data;
      
      // Save tokens and user based on remember me checkbox
      const remember = credentials.remember;
      if (remember) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('rememberMe');
        // Clear any old stored tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }

      // Return user with mapped role to support app sidebar requirements
      return {
        ...user,
        role: user.userRole,
      };
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
      return rejectWithValue(errorMsg);
    }
  }
);

export const getMeThunk = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!userStr) {
        throw new Error('User data not found in storage');
      }
      
      const user = JSON.parse(userStr);
      return {
        ...user,
        role: user.userRole,
      };
    } catch (error: any) {
      // Clear tokens on validation failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      
      return rejectWithValue('Phiên làm việc hết hạn.');
    }
  }
);
