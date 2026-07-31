import { createSlice } from '@reduxjs/toolkit';
import type { TagsState } from '../types/tags-type';
import {
  fetchAllTagsThunk,
  createTagThunk,
  updateTagThunk,
  deleteTagThunk,
} from './tags-thunk';

const initialState: TagsState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTagsThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllTagsThunk.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchAllTagsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Không thể tải danh sách tag.'; });

    builder
      .addCase(createTagThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(createTagThunk.fulfilled, (state, action) => { state.submitting = false; state.list.push(action.payload); })
      .addCase(createTagThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Tạo tag thất bại.'; });

    builder
      .addCase(updateTagThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(updateTagThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateTagThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Cập nhật tag thất bại.'; });

    builder
      .addCase(deleteTagThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(deleteTagThunk.fulfilled, (state, action) => { state.submitting = false; state.list = state.list.filter((t) => t.id !== action.payload); })
      .addCase(deleteTagThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Xóa tag thất bại.'; });
  },
});

export const { clearError, reset } = tagsSlice.actions;
export default tagsSlice.reducer;
