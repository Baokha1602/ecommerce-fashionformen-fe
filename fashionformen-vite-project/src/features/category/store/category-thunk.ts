import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from '../api/category-api';
import type { CategoryResponse, CategoryUpsertRequest } from '../types/category-type';

/** Lấy toàn bộ danh sách danh mục */
export const fetchAllCategoriesThunk = createAsyncThunk<
  CategoryResponse[],
  void,
  { rejectValue: string }
>('category/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await categoryApi.getAllCategories();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách danh mục.',
    );
  }
});

/** Tạo danh mục mới */
export const createCategoryThunk = createAsyncThunk<
  CategoryResponse,
  CategoryUpsertRequest,
  { rejectValue: string }
>('category/create', async (body, { rejectWithValue }) => {
  try {
    return await categoryApi.createCategory(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo danh mục thất bại.',
    );
  }
});

/** Cập nhật danh mục */
export const updateCategoryThunk = createAsyncThunk<
  CategoryResponse,
  { id: number; body: CategoryUpsertRequest },
  { rejectValue: string }
>('category/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await categoryApi.updateCategory(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật danh mục thất bại.',
    );
  }
});

/** Xóa danh mục theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteCategoryThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('category/delete', async (id, { rejectWithValue }) => {
  try {
    await categoryApi.deleteCategory(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa danh mục thất bại.',
    );
  }
});
