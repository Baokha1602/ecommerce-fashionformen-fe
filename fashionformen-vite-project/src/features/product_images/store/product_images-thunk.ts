import { createAsyncThunk } from '@reduxjs/toolkit';
import { product_imagesApi } from '../api/product_images-api';
import type { ProductImagesResponse, ProductImagesRequest } from '../types/product_images-type';

/** Lấy toàn bộ danh sách hạng thành viên */
export const fetchAllProductImagesThunk = createAsyncThunk<
  ProductImagesResponse[],
  void,
  { rejectValue: string }
>('product_images/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await product_imagesApi.getAllProductImages();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách hạng thành viên.',
    );
  }
});

/** Tạo hạng mới */
export const createProductImageThunk = createAsyncThunk<
  ProductImagesResponse,
  ProductImagesRequest,
  { rejectValue: string }
>('product_images/create', async (body, { rejectWithValue }) => {
  try {
    return await product_imagesApi.createProductImage(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo hạng thành viên thất bại.',
    );
  }
});

/** Cập nhật hạng */
export const updateProductImageThunk = createAsyncThunk<
  ProductImagesResponse,
  { id: number; body: ProductImagesRequest },
  { rejectValue: string }
>('product_images/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await product_imagesApi.updateProductImage(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật hạng thành viên thất bại.',
    );
  }
});

/** Xóa hạng theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteProductImageThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('product_images/delete', async (id, { rejectWithValue }) => {
  try {
    await product_imagesApi.deleteProductImage(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa hạng thành viên thất bại.',
    );
  }
});
