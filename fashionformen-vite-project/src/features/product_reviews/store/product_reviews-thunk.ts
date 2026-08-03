import { createAsyncThunk } from '@reduxjs/toolkit';
import { product_reviewsApi } from '../api/product_reviews-api';
import type { ProductReviewsResponse, ProductReviewsRequest } from '../types/product_reviews-type';

/** Lấy toàn bộ danh sách hạng thành viên */
export const fetchAllProductReviewsThunk = createAsyncThunk<
  ProductReviewsResponse[],
  void,
  { rejectValue: string }
>('product_reviews/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await product_reviewsApi.getAllProductReviews();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Không thể tải danh sách hạng thành viên.',
    );
  }
});

/** Tạo hạng mới */
export const createProductReviewThunk = createAsyncThunk<
  ProductReviewsResponse,
  ProductReviewsRequest,
  { rejectValue: string }
>('product_reviews/create', async (body, { rejectWithValue }) => {
  try {
    return await product_reviewsApi.createProductReview(body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Tạo hạng thành viên thất bại.',
    );
  }
});

/** Cập nhật hạng */
export const updateProductReviewThunk = createAsyncThunk<
  ProductReviewsResponse,
  { id: number; body: ProductReviewsRequest },
  { rejectValue: string }
>('product_reviews/update', async ({ id, body }, { rejectWithValue }) => {
  try {
    return await product_reviewsApi.updateProductReview(id, body);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Cập nhật hạng thành viên thất bại.',
    );
  }
});

/** Xóa hạng theo ID, trả về id đã xóa để slice filter ra khỏi list */
export const deleteProductReviewThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('product_reviews/delete', async (id, { rejectWithValue }) => {
  try {
    await product_reviewsApi.deleteProductReview(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || 'Xóa hạng thành viên thất bại.',
    );
  }
});
