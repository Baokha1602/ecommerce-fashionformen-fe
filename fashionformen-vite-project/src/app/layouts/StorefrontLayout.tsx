import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LandingHeader from '@/features/landing/components/LandingHeader';
import AppFooter from '@/app/layouts/components/AppFooter';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllBannersThunk } from '@/features/banners/store/banners-thunk';
import { fetchAllBrandsThunk } from '@/features/brands/store/brands-thunk';
import { fetchAllCategoriesThunk } from '@/features/category/store/category-thunk';
import { fetchCartDetailsThunk } from '@/features/cart/store/cart-thunk';

// StorefrontLayout — Layout cho toàn bộ khu vực Storefront (Khách hàng)
const StorefrontLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  // Fetch banners, brands, categories khi mount
  useEffect(() => {
    dispatch(fetchAllBannersThunk());
    dispatch(fetchAllBrandsThunk());
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  // Fetch giỏ hàng khi user đã đăng nhập
  useEffect(() => {
    if (user) {
      dispatch(fetchCartDetailsThunk());
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* HEADER */}
      <LandingHeader onCartClick={() => navigate('/cart')} />

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <AppFooter />
    </div>
  );
};

export default StorefrontLayout;
