import { Image, Layout, Menu, type MenuProps } from 'antd';
import { useRef, useEffect, useState } from 'react';
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
  CrownOutlined,
  PictureOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';
import YoeduLogo from '@/assets/images/logo fashion for men.png';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';
import { useAppSelector } from '@/app/redux/hooks';

const { Sider } = Layout;

const LOGO_H = 64; // px

type UserRole = 'ADMIN' | 'STAFF' | string;

interface NavItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  roles?: UserRole[];
  type?: never;
}

interface NavDivider {
  type: 'divider';
  label: string;
  roles?: UserRole[];
  key: string;
}

type NavEntry = NavItem | NavDivider;

interface AppSidebarProps {
  collapsed: boolean;
}

const NAV_ENTRIES: NavEntry[] = [
  { key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard', roles: ['ADMIN', 'STAFF'] },

  { type: 'divider', key: 'd-catalog', label: 'Catalog', roles: ['ADMIN'] },
  { key: '/admin/products',   icon: <ShoppingOutlined />, label: 'Quản lý Sản phẩm',   roles: ['ADMIN'] },
  { key: '/admin/categories', icon: <AppstoreOutlined />, label: 'Quản lý Danh mục',    roles: ['ADMIN'] },
  { key: '/admin/brands',     icon: <BarcodeOutlined />,  label: 'Quản lý Thương hiệu', roles: ['ADMIN'] },

  { type: 'divider', key: 'd-ops', label: 'Vận hành', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/orders',          icon: <InboxOutlined />, label: 'Quản lý Đơn hàng', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/orders/shipping', icon: <TruckOutlined />, label: 'Xử lý Giao hàng', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/inventory',       icon: <InboxOutlined />, label: 'Quản lý Kho hàng', roles: ['ADMIN', 'STAFF'] },

  { type: 'divider', key: 'd-customers', label: 'Khách hàng', roles: ['ADMIN'] },
  { key: '/admin/customers',       icon: <TeamOutlined />,  label: 'Quản lý Khách hàng',      roles: ['ADMIN'] },
  { key: '/admin/customers/ranks', icon: <CrownOutlined />, label: 'Quản lý Hạng thành viên', roles: ['ADMIN'] },

  { type: 'divider', key: 'd-hr', label: 'Nhân sự', roles: ['ADMIN'] },
  { key: '/admin/staff', icon: <UserSwitchOutlined />, label: 'Quản lý Nhân viên', roles: ['ADMIN'] },

  { type: 'divider', key: 'd-marketing', label: 'Marketing', roles: ['ADMIN'] },
  { key: '/admin/promotions', icon: <GiftOutlined />,    label: 'Chương trình Khuyến mãi', roles: ['ADMIN'] },
  { key: '/admin/vouchers',   icon: <TagsOutlined />,    label: 'Mã giảm giá / Voucher',   roles: ['ADMIN'] },
  { key: '/admin/banners',    icon: <PictureOutlined />, label: 'Banner Quảng cáo',        roles: ['ADMIN'] },

  { type: 'divider', key: 'd-support', label: 'Hỗ trợ', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/support', icon: <CustomerServiceOutlined />, label: 'Hỗ trợ Khách hàng', roles: ['ADMIN', 'STAFF'] },

  { type: 'divider', key: 'd-system', label: 'Hệ thống', roles: ['ADMIN'] },
  { key: '/admin/reports',  icon: <BarChartOutlined />, label: 'Báo cáo Doanh thu', roles: ['ADMIN'] },
  { key: '/admin/settings', icon: <SettingOutlined />,  label: 'Cài đặt Hệ thống',  roles: ['ADMIN'] },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const location = useLocation();
  const role = (user?.role || user?.userRole)?.toUpperCase();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBottomFade, setShowBottomFade] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setShowBottomFade(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const filteredEntries = NAV_ENTRIES.filter(
    (e) => !e.roles || (role && e.roles.some((r) => r.toUpperCase() === role)),
  );

  const menuItems: MenuProps['items'] = filteredEntries.map((entry) => {
    if (entry.type === 'divider') {
      return {
        type: 'group' as const,
        key: entry.key,
        label: collapsed ? (
          <div
            style={{
              borderTop: isDark
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid #ebebeb',
              margin: '2px 8px',
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255,255,255,0.3)' : '#bbb',
              padding: '10px 0 2px 4px',
              display: 'block',
            }}
          >
            {entry.label}
          </span>
        ),
      };
    }
    return { key: entry.key, icon: entry.icon, label: entry.label };
  });

  const bgColor = isDark ? '#001529' : '#fff';

  return (
    <Sider
      width={240}
      collapsed={collapsed}
      style={{
        position: 'relative',
        background: bgColor,
        borderRight: isDark ? 'none' : '1px solid #f0f0f0',
        boxShadow: isDark ? 'none' : '2px 0 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── Logo ───────────────────────────────────────────── */}
      <div
        style={{
          height: LOGO_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: isDark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid #f0f0f0',
        }}
      >
        <Image src={YoeduLogo} preview={false} width={collapsed ? 40 : 180} />
      </div>

      {/* ── Scroll wrapper ─────────────────────────────────── */}
      <div style={{ position: 'relative' }}>
        <div
          ref={scrollRef}
          style={{
            height: `calc(100vh - ${LOGO_H}px)`,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: 20,
            scrollbarWidth: 'thin',
            scrollbarColor: isDark
              ? 'rgba(255,255,255,0.2) transparent'
              : 'rgba(0,0,0,0.15) transparent',
          }}
        >
          <Menu
            theme={isDark ? 'dark' : 'light'}
            mode="inline"
            items={menuItems}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => {
              if (!key.startsWith('d-')) navigate(key);
            }}
            style={{ border: 'none', background: 'transparent' }}
          />
        </div>

        {/* Gradient fade */}
        {showBottomFade && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 56,
              pointerEvents: 'none',
              background: isDark
                ? 'linear-gradient(to bottom, transparent, #001529)'
                : 'linear-gradient(to bottom, transparent, #fff)',
            }}
          />
        )}
      </div>
    </Sider>
  );
};

export default AppSidebar;
