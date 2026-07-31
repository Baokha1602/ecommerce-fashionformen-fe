import { createAsyncThunk } from '@reduxjs/toolkit';
import { couponApi } from '../api/coupon-api';
import type { CouponCreateRequest, CouponUpdateRequest } from '../types/coupon-type';

export const fetchAllCouponThunk = createAsyncThunk(
  'coupon/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await couponApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi khi tải danh sách mã giảm giá');
    }
  }
);

export const createCouponThunk = createAsyncThunk(
  'coupon/create',
  async (body: CouponCreateRequest, { rejectWithValue }) => {
    try {
      return await couponApi.create(body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi khi tạo mã giảm giá');
    }
  }
);

export const updateCouponThunk = createAsyncThunk(
  'coupon/update',
  async ({ id, body }: { id: number; body: CouponUpdateRequest }, { rejectWithValue }) => {
    try {
      return await couponApi.update(id, body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi khi cập nhật mã giảm giá');
    }
  }
);

export const deleteCouponThunk = createAsyncThunk(
  'coupon/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await couponApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi khi xóa mã giảm giá');
    }
  }
);
