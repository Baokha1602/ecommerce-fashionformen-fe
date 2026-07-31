import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from '../api/users-api';
import type { UserResponse, UserUpdateRequest } from '../types/users-type';

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

export const updateUserThunk = createAsyncThunk<
  UserResponse,
  { id: number; data: UserUpdateRequest },
  { rejectValue: string }
>(
  'users/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await usersApi.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật người dùng thất bại.');
    }
  },
);

export const toggleActiveUserThunk = createAsyncThunk<
  UserResponse,
  { id: number; isActive: boolean },
  { rejectValue: string }
>(
  'users/toggleActive',
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      return await usersApi.toggleActive(id, isActive);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật trạng thái thất bại.');
    }
  },
);

export const deleteUserThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await usersApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Xóa người dùng thất bại.');
    }
  },
);
