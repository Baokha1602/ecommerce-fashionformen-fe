import { createSlice } from '@reduxjs/toolkit';
import type { UsersState } from '../types/users-type';
import { fetchAllUsersThunk } from './users-thunk';

const initialState: UsersState = {
  list: [],
  loading: false,
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
    builder
      .addCase(fetchAllUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload || 'Không thể tải danh sách người dùng.';
      });
  },
});

export const { clearError, reset } = usersSlice.actions;
export default usersSlice.reducer;
