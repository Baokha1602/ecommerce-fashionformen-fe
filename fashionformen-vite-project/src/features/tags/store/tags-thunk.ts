import { createAsyncThunk } from '@reduxjs/toolkit';
import { tagsApi } from '../api/tags-api';
import type { TagResponse, TagCreateRequest, TagUpdateRequest } from '../types/tags-type';

export const fetchAllTagsThunk = createAsyncThunk<TagResponse[], void, { rejectValue: string }>(
  'tags/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await tagsApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Không thể tải danh sách tag.');
    }
  },
);

export const createTagThunk = createAsyncThunk<TagResponse, TagCreateRequest, { rejectValue: string }>(
  'tags/create',
  async (body, { rejectWithValue }) => {
    try {
      return await tagsApi.create(body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Tạo tag thất bại.');
    }
  },
);

export const updateTagThunk = createAsyncThunk<TagResponse, { id: number; body: TagUpdateRequest }, { rejectValue: string }>(
  'tags/update',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await tagsApi.update(id, body);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật tag thất bại.');
    }
  },
);

export const deleteTagThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'tags/delete',
  async (id, { rejectWithValue }) => {
    try {
      await tagsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Xóa tag thất bại.');
    }
  },
);
