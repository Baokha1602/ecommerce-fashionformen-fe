import { createSlice } from '@reduxjs/toolkit';
import type { ProductTagsState } from '../types/product_tags-type';
import {
  fetchAllProductTagsThunk,
  createProductTagThunk,
  updateProductTagThunk,
  deleteProductTagThunk,
} from './product_tags-thunk';

const initialState: ProductTagsState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const product_tagsSlice = createSlice({
  name: 'product_tags',
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
      .addCase(fetchAllProductTagsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductTagsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllProductTagsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách hạng thành viên.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createProductTagThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createProductTagThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createProductTagThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo hạng thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateProductTagThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateProductTagThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateProductTagThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật hạng thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteProductTagThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteProductTagThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteProductTagThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa hạng thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = product_tagsSlice.actions;
export default product_tagsSlice.reducer;
