import { createSlice } from '@reduxjs/toolkit';
import type { BrandsState } from '../types/brands-type';
import {
  fetchAllBrandsThunk,
  createBrandThunk,
  updateBrandThunk,
  deleteBrandThunk,
} from './brands-thunk';

const initialState: BrandsState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrandsThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllBrandsThunk.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchAllBrandsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Không thể tải danh sách thương hiệu.'; });

    builder
      .addCase(createBrandThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(createBrandThunk.fulfilled, (state, action) => { state.submitting = false; state.list.push(action.payload); })
      .addCase(createBrandThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Tạo thương hiệu thất bại.'; });

    builder
      .addCase(updateBrandThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(updateBrandThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateBrandThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Cập nhật thương hiệu thất bại.'; });

    builder
      .addCase(deleteBrandThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(deleteBrandThunk.fulfilled, (state, action) => { state.submitting = false; state.list = state.list.filter((b) => b.id !== action.payload); })
      .addCase(deleteBrandThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Xóa thương hiệu thất bại.'; });
  },
});

export const { clearError, reset } = brandsSlice.actions;
export default brandsSlice.reducer;
