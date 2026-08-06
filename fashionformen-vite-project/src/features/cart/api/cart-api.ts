import { CartControllerApi } from '@/api-generated/api';
import type { CartItemRequest } from '../types/cart-type';
import { axiosClient } from '@/shared/lib/axios';

const api = new CartControllerApi(undefined, axiosClient.defaults.baseURL, axiosClient as any);

export const cartApi = {
  getCartDetails: async () => (await api.getCartDetails()).data.data,
  addCartItem: async (body: CartItemRequest) => (await api.addCartItem(body)).data.data,
  updateCartItem: async (cartItemId: number, body: CartItemRequest) => (await api.updateCartItem(cartItemId, body)).data.data,
  removeCartItem: async (cartItemId: number) => { await api.removeCartItem(cartItemId); },
  clearCart: async () => { await api.clearCart(); },
  applyCoupon: async (couponCode: string) => (await api.applyCoupon(couponCode)).data.data,
  removeCoupon: async () => (await api.removeCoupon()).data.data,
};
