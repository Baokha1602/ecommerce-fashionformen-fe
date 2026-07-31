import { createSlice } from '@reduxjs/toolkit';
import type { ProductImagesState } from '../types/product_images-type';
import {
  fetchAllProductImagesThunk,
  createProductImageThunk,
  updateProductImageThunk,
  deleteProductImageThunk,
} from './product_images-thunk';

const initialState: ProductImagesState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const product_imagesSlice = createSlice({
  name: 'product_images',
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
      .addCase(fetchAllProductImagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductImagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProductImagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách hạng thành viên.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createProductImageThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createProductImageThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createProductImageThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo hạng thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateProductImageThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateProductImageThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateProductImageThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật hạng thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteProductImageThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteProductImageThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteProductImageThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa hạng thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = product_imagesSlice.actions;
export default product_imagesSlice.reducer;
