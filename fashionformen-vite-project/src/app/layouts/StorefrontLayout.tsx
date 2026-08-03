import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from '@/features/landing/components/LandingHeader';
import AppFooter from '@/app/layouts/components/AppFooter';
import CartDrawer from '@/features/cart/components/CartDrawer';
import { useAppDispatch } from '@/app/redux/hooks';
import { fetchAllBannersThunk } from '@/features/banners/store/banners-thunk';
import { fetchAllBrandsThunk } from '@/features/brands/store/brands-thunk';
import { fetchAllCategoriesThunk } from '@/features/category/store/category-thunk';

/**
 * StorefrontLayout — Layout cho toàn bộ khu vực Storefront (Khách hàng)
 * Bao gồm: Header + CartDrawer (toàn cục) + Outlet (page) + Footer
 */
const StorefrontLayout: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Fetch dữ liệu thật khi mount
  // NOTE: Đã chuyển phần dispatch(fetchAll...) lên StorefrontLayout để Header luôn có dữ liệu
  useEffect(() => {
    dispatch(fetchAllBannersThunk());
    dispatch(fetchAllBrandsThunk());
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <LandingHeader onCartClick={() => setCartOpen(true)} />

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <main className="flex-grow">
        <Outlet context={{ setCartOpen }} />
      </main>

      {/* ── CART DRAWER (global) ────────────────────────────── */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <AppFooter />
    </div>
  );
};

export default StorefrontLayout;
