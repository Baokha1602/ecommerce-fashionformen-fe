import { createAsyncThunk } from '@reduxjs/toolkit';
import { ranksApi } from '../api/ranks-api';
import type { RankResponse, RankUpsertRequest } from '../types/ranks-type';

/** Lấy toàn bộ danh sách hạng thành viên */
export const fetchAllRanksThunk = createAsyncThunk<
  RankResponse[],
  void,
  { rejectValue: string }
>('ranks/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await ranksApi.getAllRanks();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách hạng thành viên.',
    );
  }
});

/** Tạo hạng mới */
export const createRankThunk = createAsyncThunk<
  RankResponse,
  RankUpsertRequest,
  { rejectValue: string }
>('ranks/create', async (body, { rejectWithValue }) => {
  try {
    return await ranksApi.createRank(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo hạng thành viên thất bại.',
    );
  }
});

/** Cập nhật hạng */
export const updateRankThunk = createAsyncThunk<
  RankResponse,
  { id: number; body: RankUpsertRequest },
  { rejectValue: string }
>('ranks/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await ranksApi.updateRank(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật hạng thành viên thất bại.',
    );
  }
});

/** Xóa hạng theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteRankThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('ranks/delete', async (id, { rejectWithValue }) => {
  try {
    await ranksApi.deleteRank(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa hạng thành viên thất bại.',
    );
  }
});
