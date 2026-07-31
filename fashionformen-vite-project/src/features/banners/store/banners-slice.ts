import { createSlice } from '@reduxjs/toolkit';
import type { BannersState } from '../types/banners-type';
import {
  fetchAllBannersThunk,
  createBannerThunk,
  updateBannerThunk,
  deleteBannerThunk,
} from './banners-thunk';

const initialState: BannersState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBannersThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllBannersThunk.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchAllBannersThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Không thể tải danh sách banner.'; });

    builder
      .addCase(createBannerThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(createBannerThunk.fulfilled, (state, action) => { state.submitting = false; state.list.push(action.payload); })
      .addCase(createBannerThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Tạo banner thất bại.'; });

    builder
      .addCase(updateBannerThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(updateBannerThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateBannerThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Cập nhật banner thất bại.'; });

    builder
      .addCase(deleteBannerThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(deleteBannerThunk.fulfilled, (state, action) => { state.submitting = false; state.list = state.list.filter((b) => b.id !== action.payload); })
      .addCase(deleteBannerThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Xóa banner thất bại.'; });
  },
});

export const { clearError, reset } = bannersSlice.actions;
export default bannersSlice.reducer;
