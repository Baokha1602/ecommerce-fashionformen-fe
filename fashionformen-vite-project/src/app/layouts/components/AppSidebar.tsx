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
  EnvironmentOutlined,
} from '@ant-design/icons';
import YoeduLogo from '@/assets/images/logo fashion for men.png';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';
import { useAppSelector } from '@/app/redux/hooks';

const { Sider } = Layout;

const LOGO_H = 64;
const FOOTER_H = 48;

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

// Cấu trúc danh mục phẳng (Flat Structure) đúng theo yêu cầu từ đoạn code 2
const NAV_ENTRIES: NavEntry[] = [
  // ── DASHBOARD ──────────────────────────────────────────────────
  { key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard', roles: ['ADMIN', 'STAFF'] },

  // ── CATALOG ────────────────────────────────────────────────────
  { type: 'divider', key: 'd-catalog', label: 'Catalog', roles: ['ADMIN'] },
  { key: '/admin/products', icon: <ShoppingOutlined />, label: 'Sản phẩm', roles: ['ADMIN'] },
  { key: '/admin/products/variants', icon: <BarcodeOutlined />, label: 'Biến thể sản phẩm', roles: ['ADMIN'] },
  { key: '/admin/products/images', icon: <PictureOutlined />, label: 'Hình ảnh sản phẩm', roles: ['ADMIN'] },
  { key: '/admin/products/tags', icon: <TagsOutlined />, label: 'Gán Tag sản phẩm', roles: ['ADMIN'] },
  { key: '/admin/products/reviews', icon: <TeamOutlined />, label: 'Đánh giá sản phẩm', roles: ['ADMIN'] },
  { key: '/admin/categories', icon: <AppstoreOutlined />, label: 'Danh mục', roles: ['ADMIN'] },
  { key: '/admin/brands', icon: <BarcodeOutlined />, label: 'Thương hiệu', roles: ['ADMIN'] },
  { key: '/admin/tags', icon: <TagsOutlined />, label: 'Quản lý Tags', roles: ['ADMIN'] },

  // ── VẬN HÀNH ───────────────────────────────────────────────────
  { type: 'divider', key: 'd-ops', label: 'Vận hành', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/orders', icon: <InboxOutlined />, label: 'Quản lý Đơn hàng', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/orders/shipping', icon: <TruckOutlined />, label: 'Xử lý Giao hàng', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/inventory', icon: <InboxOutlined />, label: 'Quản lý Kho hàng', roles: ['ADMIN', 'STAFF'] },

  // ── KHÁCH HÀNG ─────────────────────────────────────────────────
  { type: 'divider', key: 'd-customers', label: 'Khách hàng', roles: ['ADMIN'] },
  { key: '/admin/customers', icon: <TeamOutlined />, label: 'Danh sách khách hàng', roles: ['ADMIN'] },
  { key: '/admin/customers/ranks', icon: <CrownOutlined />, label: 'Hạng thành viên', roles: ['ADMIN'] },
  { key: '/admin/customers/addresses', icon: <EnvironmentOutlined />, label: 'Địa chỉ khách hàng', roles: ['ADMIN'] },

  // ── NHÂN SỰ ────────────────────────────────────────────────────
  { type: 'divider', key: 'd-hr', label: 'Nhân sự', roles: ['ADMIN'] },
  { key: '/admin/staff', icon: <UserSwitchOutlined />, label: 'Quản lý Nhân viên', roles: ['ADMIN'] },

  // ── MARKETING ──────────────────────────────────────────────────
  { type: 'divider', key: 'd-marketing', label: 'Marketing', roles: ['ADMIN'] },
  { key: '/admin/promotions', icon: <GiftOutlined />, label: 'Chương trình Khuyến mãi', roles: ['ADMIN'] },
  { key: '/admin/vouchers', icon: <TagsOutlined />, label: 'Mã giảm giá / Voucher', roles: ['ADMIN'] },
  { key: '/admin/banners', icon: <PictureOutlined />, label: 'Banner Quảng cáo', roles: ['ADMIN'] },

  // ── HỖ TRỢ ─────────────────────────────────────────────────────
  { type: 'divider', key: 'd-support', label: 'Hỗ trợ', roles: ['ADMIN', 'STAFF'] },
  { key: '/admin/support', icon: <CustomerServiceOutlined />, label: 'Hỗ trợ Khách hàng', roles: ['ADMIN', 'STAFF'] },

  // ── HỆ THỐNG ───────────────────────────────────────────────────
  { type: 'divider', key: 'd-system', label: 'Hệ thống', roles: ['ADMIN'] },
  { key: '/admin/reports', icon: <BarChartOutlined />, label: 'Báo cáo Doanh thu', roles: ['ADMIN'] },
  { key: '/admin/settings', icon: <SettingOutlined />, label: 'Cài đặt Hệ thống', roles: ['ADMIN'] },
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

  // Lọc theo Role
  const filteredEntries = NAV_ENTRIES.filter(
    (e) => !e.roles || (role && e.roles.some((r) => r.toUpperCase() === role)),
  );

  // Map cấu hình sang Menu items của Ant Design
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
  const totalHeaderFooterH = collapsed ? LOGO_H : LOGO_H + FOOTER_H;

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
            height: `calc(100vh - ${totalHeaderFooterH}px)`,
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
              height: 40,
              pointerEvents: 'none',
              background: isDark
                ? 'linear-gradient(to bottom, transparent, #001529)'
                : 'linear-gradient(to bottom, transparent, #fff)',
            }}
          />
        )}
      </div>

      {/* ── Role Badge (Bottom) ─────────────────────────────── */}
      {!collapsed && (
        <div
          className={`px-4 border-t text-xs flex items-center gap-2 flex-shrink-0 ${isDark ? 'border-white/10 text-gray-400' : 'border-gray-100 text-gray-500'
            }`}
          style={{ height: FOOTER_H }}
        >
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${role === 'ADMIN'
                ? 'bg-amber-500/20 text-amber-500'
                : 'bg-blue-500/20 text-blue-400'
              }`}
          >
            {role || 'ADMIN'}
          </span>
          <span className="truncate">{user?.fullName || user?.email || 'Admin User'}</span>
        </div>
      )}
    </Sider>
  );
};

export default AppSidebar;