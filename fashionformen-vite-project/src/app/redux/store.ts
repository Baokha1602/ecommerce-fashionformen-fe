import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/store/auth-slice';
import ranksReducer from '@/features/ranks/store/ranks-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ranks: ranksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
