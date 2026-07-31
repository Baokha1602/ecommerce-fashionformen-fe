import { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import AppSidebar from './components/AppSidebar';
import AppHeader from './components/AppHeader';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';

const { Content } = Layout;

const breadcrumbMap: Record<string, string> = {
  admin: 'Dashboard',
  products: 'Sản phẩm',
  categories: 'Danh mục',
  brands: 'Thương hiệu',
  orders: 'Đơn hàng',
  inventory: 'Kho hàng',
  customers: 'Khách hàng',
  staff: 'Nhân viên',
  promotions: 'Khuyến mãi',
  vouchers: 'Voucher',
  banners: 'Banner',
  reports: 'Báo cáo',
  settings: 'Cài đặt',
  support: 'Hỗ trợ KH',
  shipping: 'Giao hàng',
  ranks: 'Hạng thành viên',
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Tất cả màu thay đổi theo light/dark
  const colors = {
    contentBg:        isDark ? '#0f0f0f' : '#f5f5f5',
    breadcrumbBg:     isDark ? '#141414' : '#fff',
    breadcrumbBorder: isDark ? '#2a2a2a' : '#f0f0f0',
    pageText:         isDark ? '#e5e5e5' : '#1a1a1a',
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    { href: '/admin', title: <HomeOutlined /> },
    ...pathSegments.slice(1).map((seg) => ({
      title: breadcrumbMap[seg] || seg,
    })),
  ];

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <AppSidebar collapsed={collapsed} />

      <Layout style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            background: colors.contentBg,
          }}
        >
          {/* ── Breadcrumb bar ─────────────────────────────────── */}
          {pathSegments.length > 1 && (
            <div style={{
              padding: '10px 24px',
              borderBottom: `1px solid ${colors.breadcrumbBorder}`,
              background: colors.breadcrumbBg,
            }}>
              <Breadcrumb items={breadcrumbItems} />
            </div>
          )}

          {/* ── Page content — màu chữ theo theme ─────────────── */}
          <div style={{
            padding: 24,
            color: colors.pageText,
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
