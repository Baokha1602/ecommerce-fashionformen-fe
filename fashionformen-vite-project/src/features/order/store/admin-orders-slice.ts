import { createSlice } from '@reduxjs/toolkit';
import type { AdminOrdersState } from '../types/admin-orders-type';
import { fetchAllAdminOrdersThunk, updateOrderStatusThunk } from './admin-orders-thunk';

const initialState: AdminOrdersState = {
  list: [],
  totalElements: 0,
  totalPages: 0,
  loading: false,
  submitting: false,
  error: null,
};

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchAllAdminOrdersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllAdminOrdersThunk.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload;
      state.list = data?.content || [];
      state.totalElements = data?.totalElements || 0;
      state.totalPages = data?.totalPages || 0;
    });
    builder.addCase(fetchAllAdminOrdersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update status
    builder.addCase(updateOrderStatusThunk.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      state.submitting = false;
      // Trả về order mới được cập nhật, ta tìm và cập nhật trong list
      const index = state.list.findIndex(o => o.id === action.payload.orderId);
      if (index !== -1 && action.payload.data) {
        state.list[index] = action.payload.data;
      }
    });
    builder.addCase(updateOrderStatusThunk.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, reset } = adminOrdersSlice.actions;
export const adminOrdersReducer = adminOrdersSlice.reducer;
