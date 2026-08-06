import { createSlice } from '@reduxjs/toolkit';
import type { CouponState } from '../types/coupon-type';
import { fetchAllCouponThunk, createCouponThunk, updateCouponThunk, deleteCouponThunk } from './coupon-thunk';

const initialState: CouponState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchAllCouponThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCouponThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload || [];
    });
    builder.addCase(fetchAllCouponThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createCouponThunk.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(createCouponThunk.fulfilled, (state, action) => {
      state.submitting = false;
      if (action.payload) {
        state.list.push(action.payload);
      }
    });
    builder.addCase(createCouponThunk.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateCouponThunk.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(updateCouponThunk.fulfilled, (state, action) => {
      state.submitting = false;
      if (action.payload) {
        const index = state.list.findIndex((item) => item.id === action.payload?.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      }
    });
    builder.addCase(updateCouponThunk.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deleteCouponThunk.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(deleteCouponThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.list = state.list.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteCouponThunk.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, reset } = couponSlice.actions;
export const couponReducer = couponSlice.reducer;
