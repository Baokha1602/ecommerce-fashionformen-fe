import { createSlice } from '@reduxjs/toolkit';
import type { ProductsState } from '../types/products-type';
import {
  fetchAllProductsThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from './products-thunk';

const initialState: ProductsState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
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
      .addCase(fetchAllProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách hạng thành viên.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo hạng thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật hạng thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa hạng thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = productsSlice.actions;
export default productsSlice.reducer;
