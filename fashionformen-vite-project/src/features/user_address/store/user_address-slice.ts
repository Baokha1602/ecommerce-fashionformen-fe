import { createSlice } from '@reduxjs/toolkit';
import type { UserAddressState } from '../types/user_address-type';
import {
  fetchUserAddressesByUserIdThunk,
  createUserAddressThunk,
  updateUserAddressThunk,
  deleteUserAddressThunk,
} from './user_address-thunk';

const initialState: UserAddressState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
};

const userAddressSlice = createSlice({
  name: 'userAddress',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddressesByUserIdThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserAddressesByUserIdThunk.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchUserAddressesByUserIdThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload || 'Không thể tải địa chỉ.'; });

    builder
      .addCase(createUserAddressThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(createUserAddressThunk.fulfilled, (state, action) => { state.submitting = false; state.list.push(action.payload); })
      .addCase(createUserAddressThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Tạo địa chỉ thất bại.'; });

    builder
      .addCase(updateUserAddressThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(updateUserAddressThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateUserAddressThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Cập nhật địa chỉ thất bại.'; });

    builder
      .addCase(deleteUserAddressThunk.pending, (state) => { state.submitting = true; state.error = null; })
      .addCase(deleteUserAddressThunk.fulfilled, (state, action) => { state.submitting = false; state.list = state.list.filter((a) => a.id !== action.payload); })
      .addCase(deleteUserAddressThunk.rejected, (state, action) => { state.submitting = false; state.error = action.payload || 'Xóa địa chỉ thất bại.'; });
  },
});

export const { clearError, reset } = userAddressSlice.actions;
export default userAddressSlice.reducer;
