import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '@/app/layouts/MainLayout';
import StorefrontLayout from '@/app/layouts/StorefrontLayout';
import ProtectedRoute from './ProtectedRoute';

// ── Auth Pages ────────────────────────────────────────────────
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';

// ── Storefront Pages ──────────────────────────────────────────
import LandingPage from '@/features/landing/pages/LandingPage';
import ProductDetailPage from '@/features/shop/pages/ProductDetailPage';

// ── Admin Pages ───────────────────────────────────────────────
import AdminDashboardPage from '@/features/admin/pages/AdminDashboardPage';
import RanksPage from '@/features/ranks/pages/RanksPage';
import CategoryPage from '@/features/category/pages/CategoryPage';

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
   * STOREFRONT (Public)
   ***********************************************************/
  {
    element: <StorefrontLayout />,
    children: [
      // Trang chủ
      {
        path: '/',
        element: <LandingPage />,
      },
      // Danh sách sản phẩm
      {
        path: '/shop',
        element: <PageStub name="Cửa hàng - Danh sách sản phẩm" />,
      },
      // Chi tiết sản phẩm
      {
        path: '/shop/:slug',
        element: <ProductDetailPage />,
      },
      // Giỏ hàng (full page — optional, drawer là chính)
      {
        path: '/cart',
        element: <PageStub name="Giỏ hàng" />,
      },
      // Thanh toán
      {
        path: '/checkout',
        element: <PageStub name="Thanh toán" />,
      },
      // Tài khoản khách hàng
      {
        path: '/account',
        element: <PageStub name="Tài khoản của tôi" />,
      },
      {
        path: '/account/orders',
        element: <PageStub name="Lịch sử đơn hàng" />,
      },
      {
        path: '/account/profile',
        element: <PageStub name="Hồ sơ cá nhân" />,
      },
      {
        path: '/account/addresses',
        element: <PageStub name="Sổ địa chỉ" />,
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
          { path: 'login',    element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
    ],
  },

  /***********************************************************
   * ADMIN / STAFF DASHBOARD (Protected)
   ***********************************************************/
  {
    element: <ProtectedRoute requireAuth={true} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // ── Dashboard ────────────────────────────────────
          { path: '/admin',            element: <AdminDashboardPage /> },
          { path: '/profile',          element: <PageStub name="Thông tin cá nhân" /> },

          // ── Catalog ──────────────────────────────────────
          { path: '/admin/products',   element: <PageStub name="Quản lý Sản phẩm" /> },
          { path: '/admin/categories', element: <CategoryPage /> },
          { path: '/admin/brands',     element: <PageStub name="Quản lý Thương hiệu" /> },

          // ── Orders ───────────────────────────────────────
          { path: '/admin/orders',          element: <PageStub name="Quản lý Đơn hàng" /> },
          { path: '/admin/orders/shipping', element: <PageStub name="Xử lý Giao hàng" /> },

          // ── Inventory ─────────────────────────────────────
          { path: '/admin/inventory',  element: <PageStub name="Kho hàng" /> },

          // ── Customers ────────────────────────────────────
          { path: '/admin/customers',       element: <PageStub name="Khách hàng" /> },
          { path: '/admin/customers/ranks', element: <RanksPage /> },

          // ── Staff ─────────────────────────────────────────
          { path: '/admin/staff',      element: <PageStub name="Quản lý Nhân viên" /> },

          // ── Promotions ───────────────────────────────────
          { path: '/admin/promotions', element: <PageStub name="Chương trình khuyến mãi" /> },
          { path: '/admin/vouchers',   element: <PageStub name="Mã giảm giá / Voucher" /> },
          { path: '/admin/banners',    element: <PageStub name="Banner quảng cáo" /> },

          // ── Customer Support ──────────────────────────────
          { path: '/admin/support',    element: <PageStub name="Hỗ trợ Khách hàng" /> },

          // ── Reports ──────────────────────────────────────
          { path: '/admin/reports',    element: <PageStub name="Báo cáo Doanh thu" /> },

          // ── Settings ─────────────────────────────────────
          { path: '/admin/settings',   element: <PageStub name="Cài đặt Hệ thống" /> },
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
