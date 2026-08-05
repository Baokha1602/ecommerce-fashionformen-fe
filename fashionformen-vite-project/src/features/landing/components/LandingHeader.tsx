import React from 'react';
import { Button, Dropdown, Badge } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { logout } from '@/features/auth/store/auth-slice';
import logo from '@/assets/images/logo fashion for men.png';

interface LandingHeaderProps {
  onCartClick?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'orders',
      icon: <UnorderedListOutlined />,
      label: 'Lịch sử mua hàng',
      onClick: () => navigate('/account/orders'),
    },
    {
      key: 'admin',
      icon: <DashboardOutlined />,
      label: 'Trang quản trị',
      onClick: () => navigate('/admin'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      {/* LOGO */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Yoedu Logo" className="h-10 w-auto filter invert brightness-0" />
      </div>

      {/* NAVIGATION MENU */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
        <a href="/shop" onClick={(e) => { e.preventDefault(); navigate('/shop'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">Sản phẩm</a>
        <a href="/shop?type=new" onClick={(e) => { e.preventDefault(); navigate('/shop?type=new'); }} className="relative text-slate-800 hover:text-[#c5a880] transition-colors">
          Hàng Mới
          <span className="absolute -top-3 -right-6 bg-red-500 text-[9px] text-white font-bold px-1 py-0.5 rounded uppercase scale-75 animate-pulse">
            New
          </span>
        </a>
        <a href="/shop?type=best-seller" onClick={(e) => { e.preventDefault(); navigate('/shop?type=best-seller'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">Hàng Bán Chạy</a>
        <a href="/shop?category=denim" onClick={(e) => { e.preventDefault(); navigate('/shop?category=denim'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">DENIM</a>
        <a href="/shop?category=outlet" onClick={(e) => { e.preventDefault(); navigate('/shop?category=outlet'); }} className="text-red-600 hover:text-red-500 font-bold transition-colors">OUTLET</a>
        <a href="/collections" onClick={(e) => { e.preventDefault(); navigate('/collections'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">Collection</a>
      </nav>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-5">
        <SearchOutlined className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors" />
        <EnvironmentOutlined className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors" />
        <Badge count={0} size="small" showZero={false}>
          <ShoppingCartOutlined
            className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors"
            onClick={() => navigate('/cart')}
          />
        </Badge>

        {user ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#c5a880] transition-all bg-slate-50">
              <UserOutlined className="text-slate-600" />
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                {user.fullName || user.email}
              </span>
            </div>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            onClick={() => navigate('/auth/login')}
            className="h-9 px-6 bg-[#000000] hover:bg-[#c5a880] border-none text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-md shadow-black/10"
          >
            Đăng Nhập
          </Button>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
