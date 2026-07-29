import React, { useState } from 'react';
import { Button, Dropdown, Badge, Popover } from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  EnvironmentOutlined, 
  ShoppingCartOutlined,
  LogoutOutlined,
  DashboardOutlined,
  DownOutlined,
  FireOutlined,
  ShopOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { logout } from '@/features/auth/store/auth-slice';
import logo from '@/assets/images/logo fashion for men.png';
import { ensureArray } from '@/shared/lib/ensure-array';

interface LandingHeaderProps {
  onCartClick?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { list: brandList } = useAppSelector((state) => state.brands);
  const { list: categoryList } = useAppSelector((state) => state.category);
  const { list: bannerList } = useAppSelector((state) => state.banners);

  const [megaOpen, setMegaOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const userRole = (user?.role || user?.userRole)?.toUpperCase();
  const isAdminOrStaff = userRole === 'ADMIN' || userRole === 'STAFF';
  const activeBrands = ensureArray(brandList).filter((b) => b.isActive !== false);
  const categories = ensureArray(categoryList);
  const activeBanners = ensureArray(bannerList).filter((b) => b.isActive !== false);

  const userMenuItems = [
    ...(isAdminOrStaff
      ? [
          {
            key: 'admin',
            icon: <DashboardOutlined />,
            label: 'Trang quản trị',
            onClick: () => navigate('/admin'),
          },
        ]
      : [
          {
            key: 'account',
            icon: <UserOutlined />,
            label: 'Tài khoản của tôi',
            onClick: () => navigate('/account'),
          },
          {
            key: 'orders',
            icon: <ShoppingCartOutlined />,
            label: 'Đơn hàng của tôi',
            onClick: () => navigate('/account/orders'),
          },
        ]),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: handleLogout,
    },
  ];

  // ── Mega Dropdown Sản Phẩm (Dùng hoàn toàn Danh mục THẬT từ Database) ──
  const megaMenuContent = (
    <div className="w-[720px] p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 grid grid-cols-12 gap-6 text-slate-800 font-sans">
      {/* Cột 1: TRUY CẬP NHANH (5 col) */}
      <div className="col-span-5 border-r border-gray-100 pr-5 space-y-4">
        <h4 className="font-extrabold text-sm uppercase tracking-wider text-black border-b pb-2 border-gray-200 flex items-center gap-2">
          <AppstoreOutlined className="text-[#c5a880]" /> SẢN PHẨM CỬA HÀNG
        </h4>
        <ul className="space-y-3 text-xs font-semibold text-slate-700">
          <li>
            <Link
              to="/shop"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-2 text-slate-900 font-bold"
              onClick={() => setMegaOpen(false)}
            >
              • Tất cả sản phẩm
            </Link>
          </li>
          <li>
            <Link
              to="/shop?sort=newest"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-2"
              onClick={() => setMegaOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Sản phẩm mới nhất
            </Link>
          </li>
          <li>
            <Link
              to="/shop?sort=bestseller"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-2"
              onClick={() => setMegaOpen(false)}
            >
              <FireOutlined className="text-amber-500" />
              Hàng bán chạy nhất
            </Link>
          </li>
          <li>
            <Link
              to="/shop?onSale=true"
              className="hover:text-red-600 transition-colors flex items-center gap-2 font-bold text-red-600"
              onClick={() => setMegaOpen(false)}
            >
              OUTLET - Hàng giảm giá
            </Link>
          </li>
        </ul>
      </div>

      {/* Cột 2: DANH MỤC THẬT TỪ DATABASE (7 col) */}
      <div className="col-span-7 space-y-3">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-black border-b pb-1.5 border-gray-200">
          DANH MỤC ({categories.length})
        </h4>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="p-2.5 rounded-lg border border-gray-100 hover:border-[#c5a880] bg-slate-50/60 hover:bg-slate-100/80 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
                onClick={() => setMegaOpen(false)}
              >
                <span className="group-hover:text-[#c5a880] transition-colors truncate">
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400 group-hover:text-[#c5a880]">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-400 py-4 italic">
            Chưa có danh mục nào trong cơ sở dữ liệu.
          </div>
        )}

        {/* Banner đính kèm nếu có banner thật */}
        {activeBanners.length > 0 && activeBanners[0].imageUrl && (
          <div
            className="relative rounded-xl overflow-hidden shadow-xs cursor-pointer mt-3 h-20 group"
            onClick={() => {
              navigate('/shop');
              setMegaOpen(false);
            }}
          >
            <img
              src={activeBanners[0].imageUrl}
              alt={activeBanners[0].title || 'Banner'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {activeBanners[0].title && (
              <div className="absolute inset-0 bg-black/40 flex items-center px-3">
                <span className="text-white font-bold text-xs uppercase drop-shadow">
                  {activeBanners[0].title}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // ── Dropdown Thương Hiệu (Dùng dữ liệu THẬT) ──
  const brandMenuContent = (
    <div className="w-64 p-3 bg-white rounded-xl shadow-xl border border-gray-100 text-slate-800">
      <div className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2 px-2 pb-1 border-b">
        THƯƠNG HIỆU ({activeBrands.length})
      </div>
      {activeBrands.length > 0 ? (
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {activeBrands.map((b) => (
            <Link
              key={b.id}
              to={`/shop?brand=${b.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
              onClick={() => setBrandOpen(false)}
            >
              {b.logoUrl ? (
                <img src={b.logoUrl} alt={b.name} className="w-7 h-7 object-contain rounded" />
              ) : (
                <ShopOutlined className="text-slate-400 group-hover:text-[#c5a880]" />
              )}
              <span className="text-xs font-semibold text-slate-700 group-hover:text-[#c5a880] transition-colors">
                {b.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-xs text-gray-400 p-2 italic">Chưa có thương hiệu nào...</div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-xs">
      {/* CHỈ DÙNG LOGO ẢNH GỐC CỦA BẠN (Dòng gốc, không chèn thêm logo lạ hay chữ ICONMEN) */}
      <div
        className="flex items-center cursor-pointer group"
        onClick={() => navigate('/')}
        title="Trang chủ Fashion For Men"
      >
        <img
          src={logo}
          alt="Yoedu Logo"
          className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
        />
      </div>

      {/* NAVIGATION MENU VỚI DANH MỤC VÀ THƯƠNG HIỆU THẬT */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-slate-800">
        {/* SẢN PHẨM DROPDOWN DANH MỤC THẬT */}
        <Popover
          content={megaMenuContent}
          trigger="hover"
          placement="bottom"
          open={megaOpen}
          onOpenChange={setMegaOpen}
          overlayInnerStyle={{ padding: 0 }}
        >
          <button className="flex items-center gap-1 hover:text-[#c5a880] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#c5a880]">
            Sản phẩm <DownOutlined className="text-[10px]" />
          </button>
        </Popover>

        {/* HÀNG MỚI WITH BADGE */}
        <Link to="/shop?sort=newest" className="relative hover:text-[#c5a880] transition-colors py-1">
          Hàng Mới
          <span className="absolute -top-2.5 -right-5 bg-red-500 text-[9px] text-white font-extrabold px-1 py-0.2 rounded uppercase scale-90 animate-pulse">
            New
          </span>
        </Link>

        {/* HÀNG BÁN CHẠY */}
        <Link to="/shop?sort=bestseller" className="hover:text-[#c5a880] transition-colors py-1">
          Hàng Bán Chạy
        </Link>

        {/* THƯƠNG HIỆU DROPDOWN THẬT */}
        <Popover
          content={brandMenuContent}
          trigger="hover"
          placement="bottom"
          open={brandOpen}
          onOpenChange={setBrandOpen}
          overlayInnerStyle={{ padding: 0 }}
        >
          <button className="flex items-center gap-1 hover:text-[#c5a880] transition-colors cursor-pointer py-1">
            Thương hiệu <DownOutlined className="text-[10px]" />
          </button>
        </Popover>

        {/* OUTLET - HÀNG GIẢM GIÁ NỔI BẬT */}
        <Link
          to="/shop?onSale=true"
          className="text-red-600 hover:text-red-500 font-extrabold tracking-widest transition-all hover:scale-105 py-1"
        >
          OUTLET
        </Link>

        {/* COLLECTION */}
        <Link to="/shop" className="hover:text-[#c5a880] transition-colors py-1">
          Collection
        </Link>
      </nav>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-5">
        <SearchOutlined
          className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors"
          onClick={() => navigate('/shop')}
        />
        <EnvironmentOutlined
          className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors"
          title="Hệ thống cửa hàng"
        />
        <Badge count={0} size="small" showZero={false}>
          <ShoppingCartOutlined
            className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors"
            onClick={onCartClick}
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
            className="h-9 px-5 bg-black hover:bg-[#c5a880] border-none text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-md"
          >
            Đăng Nhập
          </Button>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
