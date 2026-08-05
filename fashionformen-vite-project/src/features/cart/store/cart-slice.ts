import { createSlice } from '@reduxjs/toolkit';
import type { CartState } from '../types/cart-type';
import { 
  fetchCartDetailsThunk, 
  addCartItemThunk, 
  updateCartItemThunk, 
  removeCartItemThunk, 
  clearCartThunk,
  applyCouponThunk,
  removeCouponThunk
} from './cart-thunk';

const initialState: CartState = {
  cartDetails: null,
  loading: false,
  submitting: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchCartDetailsThunk
    builder.addCase(fetchCartDetailsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCartDetailsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.cartDetails = action.payload || null;
    });
    builder.addCase(fetchCartDetailsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Lỗi lấy thông tin giỏ hàng';
    });

    // Submitting actions
    const pendingSubmitting = (state: CartState) => {
      state.submitting = true;
      state.error = null;
    };
    const rejectedSubmitting = (state: CartState, action: any) => {
      state.submitting = false;
      state.error = action.error.message || 'Có lỗi xảy ra';
    };
    
    // addCartItemThunk
    builder.addCase(addCartItemThunk.pending, pendingSubmitting);
    builder.addCase(addCartItemThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.cartDetails = action.payload || null;
    });
    builder.addCase(addCartItemThunk.rejected, rejectedSubmitting);

    // updateCartItemThunk
    builder.addCase(updateCartItemThunk.pending, pendingSubmitting);
    builder.addCase(updateCartItemThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.cartDetails = action.payload || null;
    });
    builder.addCase(updateCartItemThunk.rejected, rejectedSubmitting);

    // applyCouponThunk
    builder.addCase(applyCouponThunk.pending, pendingSubmitting);
    builder.addCase(applyCouponThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.cartDetails = action.payload || null;
    });
    builder.addCase(applyCouponThunk.rejected, rejectedSubmitting);

    // removeCouponThunk
    builder.addCase(removeCouponThunk.pending, pendingSubmitting);
    builder.addCase(removeCouponThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.cartDetails = action.payload || null;
    });
    builder.addCase(removeCouponThunk.rejected, rejectedSubmitting);

    // removeCartItemThunk
    builder.addCase(removeCartItemThunk.pending, pendingSubmitting);
    builder.addCase(removeCartItemThunk.fulfilled, (state, action) => {
      state.submitting = false;
      if (state.cartDetails) {
        state.cartDetails.cartItems = state.cartDetails.cartItems?.filter(item => item.id !== action.payload) || [];
      }
    });
    builder.addCase(removeCartItemThunk.rejected, rejectedSubmitting);

    // clearCartThunk
    builder.addCase(clearCartThunk.pending, pendingSubmitting);
    builder.addCase(clearCartThunk.fulfilled, (state) => {
      state.submitting = false;
      if (state.cartDetails) {
        state.cartDetails.cartItems = [];
      }
    });
    builder.addCase(clearCartThunk.rejected, rejectedSubmitting);
  },
});

export const { clearError, reset } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
