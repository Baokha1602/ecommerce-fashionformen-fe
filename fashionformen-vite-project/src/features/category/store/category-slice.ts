import { createSlice } from '@reduxjs/toolkit';
import type { CategoryState } from '../types/category-type';
import {
  fetchAllCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from './category-thunk';

const initialState: CategoryState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
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
      .addCase(fetchAllCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách danh mục.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createCategoryThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo danh mục thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateCategoryThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật danh mục thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa danh mục thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = categorySlice.actions;
export default categorySlice.reducer;
