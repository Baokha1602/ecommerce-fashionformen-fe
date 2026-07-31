import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAddressApi } from '../api/user_address-api';
import type {
  UserAddressResponse,
  UserAddressCreateRequest,
  UserAddressUpdateRequest,
} from '../types/user_address-type';

export const fetchUserAddressesByUserIdThunk = createAsyncThunk<UserAddressResponse[], number, { rejectValue: string }>(
  'userAddress/fetchByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      return await userAddressApi.getByUserId(userId);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Không thể tải địa chỉ người dùng.');
    }
  },
);

export const createUserAddressThunk = createAsyncThunk<UserAddressResponse, UserAddressCreateRequest, { rejectValue: string }>(
  'userAddress/create',
  async (body, { rejectWithValue }) => {
    try {
      return await userAddressApi.create(body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Tạo địa chỉ thất bại.');
    }
  },
);

export const updateUserAddressThunk = createAsyncThunk<UserAddressResponse, { id: number; body: UserAddressUpdateRequest }, { rejectValue: string }>(
  'userAddress/update',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await userAddressApi.update(id, body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật địa chỉ thất bại.');
    }
  },
);

export const deleteUserAddressThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'userAddress/delete',
  async (id, { rejectWithValue }) => {
    try {
      await userAddressApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Xóa địa chỉ thất bại.');
    }
  },
);
