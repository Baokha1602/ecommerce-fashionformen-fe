import { createAsyncThunk } from '@reduxjs/toolkit';
import { product_tagsApi } from '../api/product_tags-api';
import type { ProductTagResponse, ProductTagRequest } from '../types/product_tags-type';

/** Lấy toàn bộ danh sách hạng thành viên */
export const fetchAllProductTagsThunk = createAsyncThunk<
  ProductTagResponse[],
  void,
  { rejectValue: string }
>('product_tags/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await product_tagsApi.getAllProductTags();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách hạng thành viên.',
    );
  }
});

/** Tạo hạng mới */
export const createProductTagThunk = createAsyncThunk<
  ProductTagResponse,
  ProductTagRequest,
  { rejectValue: string }
>('product_tags/create', async (body, { rejectWithValue }) => {
  try {
    return await product_tagsApi.createProductTag(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo hạng thành viên thất bại.',
    );
  }
});

/** Cập nhật hạng */
export const updateProductTagThunk = createAsyncThunk<
  ProductTagResponse,
  { id: number; body: ProductTagRequest },
  { rejectValue: string }
>('product_tags/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await product_tagsApi.updateProductTag(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật hạng thành viên thất bại.',
    );
  }
});

/** Xóa hạng theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteProductTagThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('product_tags/delete', async (id, { rejectWithValue }) => {
  try {
    await product_tagsApi.deleteProductTag(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa hạng thành viên thất bại.',
    );
  }
});
