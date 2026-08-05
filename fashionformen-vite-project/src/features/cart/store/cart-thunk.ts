import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../api/cart-api';
import type { CartItemRequest, CartResponse } from '../types/cart-type';

export const fetchCartDetailsThunk = createAsyncThunk<CartResponse, void, { rejectValue: string }>(
  'cart/fetchCartDetails',
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartApi.getCartDetails();
      return data as CartResponse;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi lấy thông tin giỏ hàng');
    }
  }
);

export const addCartItemThunk = createAsyncThunk<CartResponse, CartItemRequest, { rejectValue: string }>(
  'cart/addCartItem',
  async (body: CartItemRequest, { rejectWithValue }) => {
    try {
      const data = await cartApi.addCartItem(body);
      return data as CartResponse;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi thêm vào giỏ hàng');
    }
  }
);

export const updateCartItemThunk = createAsyncThunk<CartResponse, { cartItemId: number; body: CartItemRequest }, { rejectValue: string }>(
  'cart/updateCartItem',
  async ({ cartItemId, body }, { rejectWithValue }) => {
    try {
      const data = await cartApi.updateCartItem(cartItemId, body);
      return data as CartResponse;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi cập nhật giỏ hàng');
    }
  }
);

export const removeCartItemThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'cart/removeCartItem',
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      await cartApi.removeCartItem(cartItemId);
      return cartItemId;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi xóa sản phẩm khỏi giỏ hàng');
    }
  }
);

export const clearCartThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi xóa giỏ hàng');
    }
  }
);

export const applyCouponThunk = createAsyncThunk<CartResponse, string, { rejectValue: string }>(
  'cart/applyCoupon',
  async (couponCode: string, { rejectWithValue }) => {
    try {
      const data = await cartApi.applyCoupon(couponCode);
      return data as CartResponse;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi áp dụng mã giảm giá');
    }
  }
);

export const removeCouponThunk = createAsyncThunk<CartResponse, void, { rejectValue: string }>(
  'cart/removeCoupon',
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartApi.removeCoupon();
      return data as CartResponse;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Lỗi gỡ mã giảm giá');
    }
  }
);
