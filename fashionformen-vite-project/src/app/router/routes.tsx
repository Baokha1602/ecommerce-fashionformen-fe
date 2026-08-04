import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '@/app/layouts/MainLayout';
import StorefrontLayout from '@/app/layouts/StorefrontLayout';
import ProtectedRoute from './ProtectedRoute';

// ── Auth Pages ────────────────────────────────────────────────
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

// ── Storefront Pages ──────────────────────────────────────────
import LandingPage from '@/features/landing/pages/LandingPage';
import ShopPage from '@/features/shop/pages/ShopPage';
import ProductDetailPage from '@/features/shop/pages/ProductDetailPage';

// ── Admin Pages ───────────────────────────────────────────────
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage';
import RanksPage from '@/features/ranks/pages/RanksPage';
import CategoryPage from '@/features/catalog/pages/CategoryPage';
import BrandPage from '@/features/catalog/pages/BrandPage';
import TagsPage from '@/features/tags/pages/TagsPage';
import BannersPage from '@/features/banners/pages/BannersPage';
import UsersPage from '@/features/users/pages/UsersPage';
import StaffPage from '@/features/users/pages/StaffPage';
import UserAddressPage from '@/features/user_address/pages/UserAddressPage';
import ProductPage from '@/features/catalog/pages/ProductPage';
import ProductImagePage from '@/features/catalog/pages/ProductImagePage';
import ProductReviewPage from '@/features/catalog/pages/ProductReviewPage';
import ProductTagPage from '@/features/catalog/pages/ProductTagPage';
import ProductVariantPage from '@/features/catalog/pages/ProductVariantPage';

// ── Page Stub (placeholder cho các trang chưa xây dựng) ───────
const PageStub = ({ name }: { name: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl space-y-4">
    <span className="text-[#c5a880] text-xs font-semibold uppercase tracking-widest bg-[#c5a880]/10 px-3 py-1 rounded-full border border-[#c5a880]/20">
      Fashion For Men
    </span>
    <h1 className="text-2xl font-bold tracking-wide text-slate-800">{name}</h1>
    <p className="text-gray-400 text-sm leading-relaxed">
      Trang <span className="text-slate-700 font-medium">{name}</span> đang được xây dựng.
      UI Shell đã được thiết lập — logic API sẽ được bổ sung ở giai đoạn tiếp theo.
    </p>
  </div>
);

export const router = createBrowserRouter([

  /***********************************************************
   * STOREFRONT (Public & Customer Account)
   ***********************************************************/
  {
    element: <StorefrontLayout />,
    children: [
      // Public pages
      { path: '/', element: <LandingPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/shop/:slug', element: <ProductDetailPage /> },
      { path: '/cart', element: <PageStub name="Giỏ hàng" /> },
      { path: '/checkout', element: <PageStub name="Thanh toán" /> },

      // Customer account routes (Cần đăng nhập)
      {
        element: <ProtectedRoute requireAuth={true} allowedRoles={['CUSTOMER', 'ADMIN', 'STAFF']} />,
        children: [
          { path: '/account', element: <PageStub name="Tài khoản của tôi" /> },
          { path: '/account/orders', element: <PageStub name="Lịch sử đơn hàng" /> },
          { path: '/account/profile', element: <PageStub name="Hồ sơ cá nhân" /> },
          { path: '/account/addresses', element: <UserAddressPage /> },
        ],
      },
    ],
  },

  /***********************************************************
   * AUTH (Public — chỉ khi chưa đăng nhập)
   ***********************************************************/
  {
    element: <ProtectedRoute requireAuth={false} />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },

  /***********************************************************
   * ADMIN / STAFF DASHBOARD (Chỉ ADMIN và STAFF mới được truy cập)
   ***********************************************************/
  {
    element: <ProtectedRoute requireAuth={true} allowedRoles={['ADMIN', 'STAFF']} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // ── Dashboard dùng chung (ADMIN & STAFF) ────────
          { path: '/admin', element: <AdminDashboardPage /> },
          { path: '/profile', element: <PageStub name="Thông tin cá nhân" /> },

          // ── Vận hành & Hỗ trợ (ADMIN & STAFF) ────────────
          { path: '/admin/orders', element: <PageStub name="Quản lý Đơn hàng" /> },
          { path: '/admin/orders/shipping', element: <PageStub name="Xử lý Giao hàng" /> },
          { path: '/admin/inventory', element: <PageStub name="Quản lý Kho hàng" /> },
          { path: '/admin/support', element: <PageStub name="Hỗ trợ Khách hàng" /> },

          // ── Các trang dành riêng cho ADMIN (STAFF không vào được) ─
          {
            element: <ProtectedRoute requireAuth={true} allowedRoles={['ADMIN']} redirectTo="/admin" />,
            children: [
              // Catalog
              { path: '/admin/products', element: <ProductPage /> },
              { path: '/admin/products/variants', element: <ProductVariantPage /> },
              { path: '/admin/products/images', element: <ProductImagePage /> },
              { path: '/admin/products/reviews', element: <ProductReviewPage /> },
              { path: '/admin/products/tags', element: <ProductTagPage /> },
              { path: '/admin/categories', element: <CategoryPage /> },
              { path: '/admin/brands', element: <BrandPage /> },
              { path: '/admin/tags', element: <TagsPage /> },

              // Customers & Ranks
              { path: '/admin/customers', element: <UsersPage /> },
              { path: '/admin/customers/ranks', element: <RanksPage /> },
              { path: '/admin/customers/addresses', element: <UserAddressPage /> },

              // Staff / HR
              { path: '/admin/staff', element: <StaffPage /> },

              // Marketing
              { path: '/admin/promotions', element: <PageStub name="Chương trình khuyến mãi" /> },
              { path: '/admin/vouchers', element: <PageStub name="Mã giảm giá / Voucher" /> },
              { path: '/admin/banners', element: <BannersPage /> },

              // Reports & System Settings
              { path: '/admin/reports', element: <PageStub name="Báo cáo Doanh thu" /> },
              { path: '/admin/settings', element: <PageStub name="Cài đặt Hệ thống" /> },
            ],
          },
        ],
      },
    ],
  },

  /***********************************************************
   * Fallback
   ***********************************************************/
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
