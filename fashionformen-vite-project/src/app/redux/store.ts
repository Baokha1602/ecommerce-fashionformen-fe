import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/store/auth-slice';
import ranksReducer from '@/features/ranks/store/ranks-slice';
import categoryReducer from '@/features/category/store/category-slice';
import { otpApi } from '@/features/auth/api/otp-api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ranks: ranksReducer,
    category: categoryReducer,
    [otpApi.reducerPath]: otpApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(otpApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
