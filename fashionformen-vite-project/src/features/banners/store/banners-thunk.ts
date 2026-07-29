import { createAsyncThunk } from '@reduxjs/toolkit';
import { bannersApi } from '../api/banners-api';
import type { BannerResponse, BannerUpsertRequest } from '../types/banners-type';

export const fetchAllBannersThunk = createAsyncThunk<BannerResponse[], void, { rejectValue: string }>(
  'banners/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await bannersApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Không thể tải danh sách banner.');
    }
  },
);

export const createBannerThunk = createAsyncThunk<BannerResponse, BannerUpsertRequest, { rejectValue: string }>(
  'banners/create',
  async (body, { rejectWithValue }) => {
    try {
      return await bannersApi.create(body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Tạo banner thất bại.');
    }
  },
);

export const updateBannerThunk = createAsyncThunk<BannerResponse, { id: number; body: BannerUpsertRequest }, { rejectValue: string }>(
  'banners/update',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await bannersApi.update(id, body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật banner thất bại.');
    }
  },
);

export const deleteBannerThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'banners/delete',
  async (id, { rejectWithValue }) => {
    try {
      await bannersApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Xóa banner thất bại.');
    }
  },
);
