import { createSlice } from '@reduxjs/toolkit';
import type { OrderState } from '../types/order-type';
import { 
  fetchOrderHistoryThunk, 
  createOrderThunk, 
  cancelOrderThunk,
  createMoMoUrlThunk,
  createVnPayUrlThunk,
  verifyVnPayReturnThunk
} from './order-thunk';

const initialState: OrderState = {
  historyList: [],
  totalPages: 0,
  totalElements: 0,
  loading: false,
  submitting: false,
  error: null,
  paymentUrl: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPaymentUrl: (state) => {
      state.paymentUrl = null;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchOrderHistoryThunk
    builder.addCase(fetchOrderHistoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderHistoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.historyList = action.payload?.content || [];
      state.totalPages = action.payload?.totalPages || 0;
      state.totalElements = action.payload?.totalElements || 0;
    });
    builder.addCase(fetchOrderHistoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Lỗi lấy lịch sử đơn hàng';
    });

    const pendingSubmitting = (state: OrderState) => {
      state.submitting = true;
      state.error = null;
    };
    const rejectedSubmitting = (state: OrderState, action: any) => {
      state.submitting = false;
      state.error = action.error.message || 'Có lỗi xảy ra';
    };

    // createOrderThunk
    builder.addCase(createOrderThunk.pending, pendingSubmitting);
    builder.addCase(createOrderThunk.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createOrderThunk.rejected, rejectedSubmitting);

    // cancelOrderThunk
    builder.addCase(cancelOrderThunk.pending, pendingSubmitting);
    builder.addCase(cancelOrderThunk.fulfilled, (state, action) => {
      state.submitting = false;
      const index = state.historyList.findIndex(o => o.id === action.payload);
      if (index !== -1) {
        state.historyList[index].orderStatus = 'CANCELLED'; // assuming CANCELLED status
      }
    });
    builder.addCase(cancelOrderThunk.rejected, rejectedSubmitting);

    // create payment urls
    builder.addCase(createMoMoUrlThunk.pending, pendingSubmitting);
    builder.addCase(createMoMoUrlThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.paymentUrl = action.payload as string;
    });
    builder.addCase(createMoMoUrlThunk.rejected, rejectedSubmitting);

    builder.addCase(createVnPayUrlThunk.pending, pendingSubmitting);
    builder.addCase(createVnPayUrlThunk.fulfilled, (state, action) => {
      state.submitting = false;
      state.paymentUrl = action.payload as string;
    });
    builder.addCase(createVnPayUrlThunk.rejected, rejectedSubmitting);
    
    // verifyVnPayReturnThunk
    builder.addCase(verifyVnPayReturnThunk.pending, pendingSubmitting);
    builder.addCase(verifyVnPayReturnThunk.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(verifyVnPayReturnThunk.rejected, rejectedSubmitting);
  },
});

export const { clearError, resetPaymentUrl, reset } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export * from './order-thunk';
