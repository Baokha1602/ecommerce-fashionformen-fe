import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../api/products-api';
import type { ProductResponse, ProductRequest } from '../types/products-type';

/** Lấy toàn bộ danh sách hạng thành viên */
export const fetchAllProductsThunk = createAsyncThunk<
  ProductResponse[],
  void,
  { rejectValue: string }
>('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await productsApi.getAllProducts();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách hạng thành viên.',
    );
  }
});

/** Tạo hạng mới */
export const createProductThunk = createAsyncThunk<
  ProductResponse,
  ProductRequest,
  { rejectValue: string }
>('products/create', async (body, { rejectWithValue }) => {
  try {
    return await productsApi.createProduct(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo hạng thành viên thất bại.',
    );
  }
});

/** Cập nhật hạng */
export const updateProductThunk = createAsyncThunk<
  ProductResponse,
  { id: number; body: ProductRequest },
  { rejectValue: string }
>('products/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await productsApi.updateProduct(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật hạng thành viên thất bại.',
    );
  }
});

/** Xóa hạng theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteProductThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('products/delete', async (id, { rejectWithValue }) => {
  try {
    await productsApi.deleteProduct(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa hạng thành viên thất bại.',
    );
  }
});
