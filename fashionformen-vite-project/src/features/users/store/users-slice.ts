import { createSlice } from '@reduxjs/toolkit';
import type { UsersState } from '../types/users-type';
import {
  fetchAllUsersThunk,
  updateUserThunk,
  toggleActiveUserThunk,
  deleteUserThunk,
} from './users-thunk';

const initialState: UsersState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch all
    builder
      .addCase(fetchAllUsersThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload || 'Không thể tải danh sách người dùng.';
      });

    // Update user
    builder
      .addCase(updateUserThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật người dùng thất bại.';
      });

    // Toggle active
    builder
      .addCase(toggleActiveUserThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(toggleActiveUserThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(toggleActiveUserThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật trạng thái thất bại.';
      });

    // Delete user
    builder
      .addCase(deleteUserThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa người dùng thất bại.';
      });
  },
});

export const { clearError, reset } = usersSlice.actions;
export default usersSlice.reducer;
