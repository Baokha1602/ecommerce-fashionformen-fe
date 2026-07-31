import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/store/auth-slice';
import ranksReducer from '@/features/ranks/store/ranks-slice';

import { couponReducer } from '@/features/coupon/store/coupon-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ranks: ranksReducer,
    coupon: couponReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
