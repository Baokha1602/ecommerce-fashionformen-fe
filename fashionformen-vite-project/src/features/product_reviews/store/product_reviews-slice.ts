import { createSlice } from '@reduxjs/toolkit';
import type { ProductReviewsState } from '../types/product_reviews-type';
import {
  fetchAllProductReviewsThunk,
  createProductReviewThunk,
  updateProductReviewThunk,
  deleteProductReviewThunk,
} from './product_reviews-thunk';

const initialState: ProductReviewsState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const product_reviewsSlice = createSlice({
  name: 'product_reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // ── Fetch all ──────────────────────────────────────────────
    builder
      .addCase(fetchAllProductReviewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProductReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách hạng thành viên.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createProductReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createProductReviewThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createProductReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo hạng thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateProductReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateProductReviewThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateProductReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật hạng thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteProductReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteProductReviewThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteProductReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa hạng thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = product_reviewsSlice.actions;
export default product_reviewsSlice.reducer;
