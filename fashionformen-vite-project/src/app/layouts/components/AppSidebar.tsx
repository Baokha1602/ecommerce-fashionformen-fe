import { Image, Layout, Menu, type MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  InboxOutlined,
  TagsOutlined,
  BarChartOutlined,
  SettingOutlined,
  GiftOutlined,
  TruckOutlined,
  CustomerServiceOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import YoeduLogo from '@/assets/images/logo fashion for men.png';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';
import { useAppSelector } from '@/app/redux/hooks';

const { Sider } = Layout;

type UserRole = 'ADMIN' | 'STAFF' | string;

type MenuItem = Required<MenuProps>['items'][number] & {
  roles?: UserRole[];
  children?: MenuItem[];
};

interface AppSidebarProps {
  collapsed: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    // ── ADMIN ONLY ────────────────────────────────────────────────
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      roles: ['ADMIN'],
    },

    // ── CATALOG ───────────────────────────────────────────────────
    {
      key: 'catalog',
      label: 'Danh mục & Sản phẩm',
      icon: <ShoppingOutlined />,
      roles: ['ADMIN'],
      children: [
        {
          key: '/admin/products',
          icon: <ShoppingOutlined />,
          label: 'Sản phẩm',
        },
        {
          key: '/admin/products/variants',
          icon: <ShoppingOutlined />,
          label: 'Biến thể sản phẩm',
        },
        {
          key: '/admin/products/images',
          icon: <ShoppingOutlined />,
          label: 'Hình ảnh sản phẩm',
        },
        {
          key: '/admin/products/tags',
          icon: <TagsOutlined />,
          label: 'Gán Tag Sản phẩm',
        },
        {
          key: '/admin/products/reviews',
          icon: <TeamOutlined />,
          label: 'Đánh giá Sản phẩm',
        },
        {
          key: '/admin/categories',
          icon: <AppstoreOutlined />,
          label: 'Danh mục',
        },
        {
          key: '/admin/brands',
          icon: <TagsOutlined />,
          label: 'Thương hiệu',
        },
      ],
    },

    // ── ORDERS (ADMIN + STAFF) ────────────────────────────────────
    {
      key: 'orders',
      label: 'Quản lý Đơn hàng',
      icon: <InboxOutlined />,
      children: [
        {
          key: '/admin/orders',
          icon: <InboxOutlined />,
          label: 'Tất cả đơn hàng',
        },
        {
          key: '/admin/orders/shipping',
          icon: <TruckOutlined />,
          label: 'Xử lý Giao hàng',
        },
      ],
    },

    // ── INVENTORY (ADMIN + STAFF) ─────────────────────────────────
    {
      key: '/admin/inventory',
      icon: <InboxOutlined />,
      label: 'Kho hàng',
    },

    // ── CUSTOMERS ─────────────────────────────────────────────────
    {
      key: 'customers',
      label: 'Khách hàng',
      icon: <TeamOutlined />,
      roles: ['ADMIN'],
      children: [
        {
          key: '/admin/customers',
          icon: <TeamOutlined />,
          label: 'Danh sách khách hàng',
        },
        {
          key: '/admin/customers/ranks',
          icon: <TagsOutlined />,
          label: 'Hạng thành viên',
        },
      ],
    },

    // ── STAFF MANAGEMENT ──────────────────────────────────────────
    {
      key: '/admin/staff',
      icon: <UserSwitchOutlined />,
      label: 'Quản lý Nhân viên',
      roles: ['ADMIN'],
    },

    // ── PROMOTIONS (ADMIN + STAFF) ────────────────────────────────
    {
      key: 'promotions',
      label: 'Khuyến mãi',
      icon: <GiftOutlined />,
      roles: ['ADMIN'],
      children: [
        {
          key: '/admin/promotions',
          icon: <GiftOutlined />,
          label: 'Chương trình giảm giá',
        },
        {
          key: '/admin/vouchers',
          icon: <TagsOutlined />,
          label: 'Mã giảm giá / Voucher',
        },
        {
          key: '/admin/banners',
          icon: <AppstoreOutlined />,
          label: 'Banner quảng cáo',
        },
      ],
    },

    // ── CUSTOMER SUPPORT (STAFF) ──────────────────────────────────
    {
      key: '/admin/support',
      icon: <CustomerServiceOutlined />,
      label: 'Hỗ trợ Khách hàng',
      roles: ['STAFF'],
    },

    // ── REPORTS ───────────────────────────────────────────────────
    {
      key: '/admin/reports',
      icon: <BarChartOutlined />,
      label: 'Báo cáo Doanh thu',
      roles: ['ADMIN'],
    },

    // ── SETTINGS ──────────────────────────────────────────────────
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt & Khác',
      roles: ['ADMIN'],
      children: [
        {
          key: '/admin/settings',
          icon: <SettingOutlined />,
          label: 'Cài đặt Hệ thống',
        },
        {
          key: '/admin/tags',
          icon: <TagsOutlined />,
          label: 'Quản lý Tag chung',
        },
      ],
    },
  ];

  const filterMenuByRole = (items: MenuItem[], role?: string): MenuItem[] => {
    return (
      items
        .filter((item) => !item.roles || item.roles.includes(role!))
        .map((item) => ({
          ...item,
          children: item.children ? filterMenuByRole(item.children, role) : undefined,
        }))
        .filter((item) => {
          const isLeaf = !item.children;
          const hasChildren = item.children?.length;
          return isLeaf || hasChildren;
        }) as MenuItem[]
    );
  };

  return (
    <Sider
      width={240}
      collapsed={collapsed}
      className="h-screen overflow-hidden flex flex-col"
      style={{
        background: isDark ? '#001529' : '#fff',
        borderRight: isDark ? 'none' : '1px solid #f0f0f0',
        boxShadow: isDark ? 'none' : '2px 0 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── LOGO ────────────────────────────────────────────── */}
      <div
        className={`h-16 flex items-center justify-center border-b flex-shrink-0 ${isDark ? 'border-white/10' : 'border-gray-100'
          }`}
      >
        <Image src={YoeduLogo} preview={false} width={collapsed ? 40 : 230} />
      </div>

      {/* ── MENU ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        <Menu
          theme={isDark ? 'dark' : 'light'}
          mode="inline"
          items={filterMenuByRole(menuItems, user?.role)}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={
            collapsed
              ? []
              : ['catalog', 'orders', 'customers', 'promotions']
          }
          onClick={({ key }) => navigate(key)}
          style={{
            border: 'none',
            background: 'transparent',
          }}
        />
      </div>

      {/* ── ROLE BADGE (bottom) ──────────────────────────────── */}
      {!collapsed && (
        <div
          className={`px-4 py-3 border-t text-xs flex items-center gap-2 flex-shrink-0 ${isDark ? 'border-white/10 text-gray-400' : 'border-gray-100 text-gray-500'
            }`}
        >
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user?.role === 'ADMIN'
              ? 'bg-amber-500/20 text-amber-500'
              : 'bg-blue-500/20 text-blue-400'
              }`}
          >
            {user?.role || 'ADMIN'}
          </span>
          <span className="truncate">{user?.fullName || user?.email || 'Admin User'}</span>
        </div>
      )}
    </Sider>
  );
};

export default AppSidebar;
