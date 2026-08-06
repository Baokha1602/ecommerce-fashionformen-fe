import { createSlice } from '@reduxjs/toolkit';
import type { ProductVariantsState } from '../types/product_variants-type';
import {
  fetchAllProductVariantsThunk,
  createProductVariantThunk,
  updateProductVariantThunk,
  deleteProductVariantThunk,
} from './product_variants-thunk';

const initialState: ProductVariantsState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const product_variantsSlice = createSlice({
  name: 'product_variants',
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
      .addCase(fetchAllProductVariantsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductVariantsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProductVariantsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách hạng thành viên.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createProductVariantThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createProductVariantThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createProductVariantThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo hạng thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateProductVariantThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateProductVariantThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateProductVariantThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật hạng thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteProductVariantThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteProductVariantThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteProductVariantThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa hạng thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = product_variantsSlice.actions;
export default product_variantsSlice.reducer;
