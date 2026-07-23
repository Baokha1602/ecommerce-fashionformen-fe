import { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import AppSidebar from './components/AppSidebar';
import AppHeader from './components/AppHeader';

const { Content } = Layout;

// Breadcrumb label map
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

  // Build breadcrumb items from pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      href: '/admin',
      title: <HomeOutlined />,
    },
    ...pathSegments.slice(1).map((seg) => ({
      title: breadcrumbMap[seg] || seg,
    })),
  ];

  return (
    <Layout className="min-h-screen">
      <AppSidebar collapsed={collapsed} />

      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content className="overflow-auto">
          {/* Breadcrumb bar */}
          {pathSegments.length > 1 && (
            <div className="px-6 py-3 border-b border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          )}

          {/* Page Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
