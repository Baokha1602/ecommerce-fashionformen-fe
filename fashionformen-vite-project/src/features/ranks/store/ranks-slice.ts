import { createSlice } from '@reduxjs/toolkit';
import type { RanksState } from '../types/ranks-type';
import {
  fetchAllRanksThunk,
  createRankThunk,
  updateRankThunk,
  deleteRankThunk,
} from './ranks-thunk';

const initialState: RanksState = {
  list: [],
  selected: null,
  loading: false,
  submitting: false,
  error: null,
};

const ranksSlice = createSlice({
  name: 'ranks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // ── Fetch all ──────────────────────────────────────────────
    builder
      .addCase(fetchAllRanksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRanksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllRanksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách hạng thành viên.';
      });

    // ── Create ─────────────────────────────────────────────────
    builder
      .addCase(createRankThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createRankThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list.push(action.payload);
      })
      .addCase(createRankThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Tạo hạng thất bại.';
      });

    // ── Update ─────────────────────────────────────────────────
    builder
      .addCase(updateRankThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateRankThunk.fulfilled, (state, action) => {
        state.submitting = false;
        const idx = state.list.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateRankThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Cập nhật hạng thất bại.';
      });

    // ── Delete ─────────────────────────────────────────────────
    builder
      .addCase(deleteRankThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(deleteRankThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.list = state.list.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRankThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || 'Xóa hạng thất bại.';
      });
  },
});

export const { clearError, setSelected, reset } = ranksSlice.actions;
export default ranksSlice.reducer;
