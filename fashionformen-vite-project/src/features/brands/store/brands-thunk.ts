import { createAsyncThunk } from '@reduxjs/toolkit';
import { brandsApi } from '../api/brands-api';
import type { BrandResponse, BrandUpsertRequest } from '../types/brands-type';

export const fetchAllBrandsThunk = createAsyncThunk<BrandResponse[], void, { rejectValue: string }>(
  'brands/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await brandsApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Không thể tải danh sách thương hiệu.');
    }
  },
);

export const createBrandThunk = createAsyncThunk<BrandResponse, BrandUpsertRequest, { rejectValue: string }>(
  'brands/create',
  async (body, { rejectWithValue }) => {
    try {
      return await brandsApi.create(body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Tạo thương hiệu thất bại.');
    }
  },
);

export const updateBrandThunk = createAsyncThunk<BrandResponse, { id: number; body: BrandUpsertRequest }, { rejectValue: string }>(
  'brands/update',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await brandsApi.update(id, body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật thương hiệu thất bại.');
    }
  },
);

export const deleteBrandThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'brands/delete',
  async (id, { rejectWithValue }) => {
    try {
      await brandsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Xóa thương hiệu thất bại.');
    }
  },
);
