import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/store/auth-slice';
import ranksReducer from '@/features/ranks/store/ranks-slice';
import categoryReducer from '@/features/category/store/category-slice';
import brandsReducer from '@/features/brands/store/brands-slice';
import tagsReducer from '@/features/tags/store/tags-slice';
import bannersReducer from '@/features/banners/store/banners-slice';
import usersReducer from '@/features/users/store/users-slice';
import userAddressReducer from '@/features/user_address/store/user_address-slice';
import productsReducer from '@/features/products/store/products-slice';
import productImagesReducer from '@/features/product_images/store/product_images-slice';
import productReviewsReducer from '@/features/product_reviews/store/product_reviews-slice';
import productTagsReducer from '@/features/product_tags/store/product_tags-slice';
import productVariantsReducer from '@/features/product_variants/store/product_variants-slice';
import { otpApi } from '@/features/auth/api/otp-api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ranks: ranksReducer,
    category: categoryReducer,
    brands: brandsReducer,
    tags: tagsReducer,
    banners: bannersReducer,
    users: usersReducer,
    userAddress: userAddressReducer,
    products: productsReducer,
    productImages: productImagesReducer,
    productReviews: productReviewsReducer,
    productTags: productTagsReducer,
    productVariants: productVariantsReducer,
    [otpApi.reducerPath]: otpApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(otpApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
