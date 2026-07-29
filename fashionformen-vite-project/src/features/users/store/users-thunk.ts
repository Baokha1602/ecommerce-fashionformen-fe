import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from '../api/users-api';
import type { UserResponse } from '../types/users-type';

export const fetchAllUsersThunk = createAsyncThunk<UserResponse[], void, { rejectValue: string }>(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await usersApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Không thể tải danh sách người dùng.');
    }
  },
);
