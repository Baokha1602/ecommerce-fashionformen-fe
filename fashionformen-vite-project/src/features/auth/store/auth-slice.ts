import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from '../types/auth-type';
import { loginThunk, getMeThunk } from './auth-thunk';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      state.user = null;
      state.error = null;
    },
    markInitialized: (state) => {
      state.initialized = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập thất bại';
      });

    // Get Me
    builder
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.initialized = true;
      });
  },
});

export const { logout, markInitialized, clearError } = authSlice.actions;
export default authSlice.reducer;
