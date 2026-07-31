import { createAsyncThunk } from '@reduxjs/toolkit';
import { product_variantsApi } from '../api/product_variants-api';
import type { ProductVariantResponse, ProductVariantRequest } from '../types/product_variants-type';

/** Lấy toàn bộ danh sách hạng thành viên */
export const fetchAllProductVariantsThunk = createAsyncThunk<
  ProductVariantResponse[],
  void,
  { rejectValue: string }
>('product_variants/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await product_variantsApi.getAllProductVariants();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách hạng thành viên.',
    );
  }
});

/** Tạo hạng mới */
export const createProductVariantThunk = createAsyncThunk<
  ProductVariantResponse,
  ProductVariantRequest,
  { rejectValue: string }
>('product_variants/create', async (body, { rejectWithValue }) => {
  try {
    return await product_variantsApi.createProductVariant(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo hạng thành viên thất bại.',
    );
  }
});

/** Cập nhật hạng */
export const updateProductVariantThunk = createAsyncThunk<
  ProductVariantResponse,
  { id: number; body: ProductVariantRequest },
  { rejectValue: string }
>('product_variants/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await product_variantsApi.updateProductVariant(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật hạng thành viên thất bại.',
    );
  }
});

/** Xóa hạng theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteProductVariantThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('product_variants/delete', async (id, { rejectWithValue }) => {
  try {
    await product_variantsApi.deleteProductVariant(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa hạng thành viên thất bại.',
    );
  }
});
