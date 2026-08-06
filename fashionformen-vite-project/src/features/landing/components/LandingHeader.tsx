import React, { useState } from 'react';
import { Badge, Dropdown, App } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  DownOutlined,
  AppstoreOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { logout } from '@/features/auth/store/auth-slice';
import { createUserAddressThunk } from '@/features/user_address/store/user_address-thunk';
import { UserAddressFormModal } from '@/features/user_address/components/UserAddressFormModal';
import type { UserAddressCreateRequest } from '@/features/user_address/types/user_address-type';
import logo from '@/assets/images/logo fashion for men.png';
import { ensureArray } from '@/shared/lib/ensure-array';

interface LandingHeaderProps {
  onCartClick?: () => void;
}

// Tag cố định để lọc sản phẩm theo nhóm
const QUICK_TAGS = [
  { label: 'Áo thun', value: 'ao-thun' },
  { label: 'Áo sơ mi', value: 'ao-so-mi' },
  { label: 'Quần jean', value: 'quan-jean' },
  { label: 'Denim', value: 'denim' },
  { label: 'Polo', value: 'polo' },
  { label: 'Hoodie', value: 'hoodie' },
];

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const { user } = useAppSelector((state) => state.auth);
  const { list: categoryList } = useAppSelector((state) => state.category);
  const { cartDetails } = useAppSelector((state) => state.cart);
  const { submitting: addressSubmitting } = useAppSelector((state) => state.userAddress);

  // Badge số lượng item thật trong giỏ hàng
  const cartCount = cartDetails?.cartItems?.length ?? 0;

  const [megaOpen, setMegaOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const categories = ensureArray(categoryList);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Nếu chưa login thì redirect về login, ngược lại mở modal thêm địa chỉ
  const handleAddressClick = () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    setAddressModalOpen(true);
  };

  // Submit form thêm địa chỉ (dùng UserAddressFormModal với GHN API)
  const handleAddressSubmit = async (values: UserAddressCreateRequest) => {
    const payload: UserAddressCreateRequest = { ...values, userId: user!.id! };
    const result = await dispatch(createUserAddressThunk(payload));
    if (createUserAddressThunk.fulfilled.match(result)) {
      message.success('Thêm địa chỉ thành công!');
      setAddressModalOpen(false);
    } else {
      message.error('Thêm địa chỉ thất bại, vui lòng thử lại.');
    }
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
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
          <img src={logo} alt="Fashion For Men Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide uppercase">
          {/* Mega-dropdown Sản phẩm */}
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className="flex items-center gap-1 text-slate-800 hover:text-[#c5a880] transition-colors py-4">
              Sản phẩm
              <DownOutlined style={{ fontSize: 10 }} />
            </button>

            {megaOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white shadow-2xl border border-slate-100 rounded-2xl z-50 p-6"
                style={{ marginTop: -2 }}
              >
                <div className="grid grid-cols-3 gap-6">
                  {/* Cột 1 — Tổng quát */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 border-b border-slate-100 pb-2">
                      Tổng quát
                    </p>
                    <div className="space-y-2">
                      <Link to="/shop" onClick={() => setMegaOpen(false)} className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#c5a880] font-semibold transition-colors">
                        <AppstoreOutlined /> Tất cả sản phẩm
                      </Link>
                      <Link to="/shop?type=new" onClick={() => setMegaOpen(false)} className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#c5a880] font-semibold transition-colors">
                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Hàng mới về
                      </Link>
                      <Link to="/shop?type=best-seller" onClick={() => setMegaOpen(false)} className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#c5a880] font-semibold transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#c5a880] inline-block" /> Bán chạy nhất
                      </Link>
                      <Link to="/shop?type=outlet" onClick={() => setMegaOpen(false)} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-500 font-bold transition-colors">
                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> OUTLET — Giảm giá
                      </Link>
                    </div>
                  </div>

                  {/* Cột 2 — Danh mục thật từ API */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 border-b border-slate-100 pb-2">
                      Theo danh mục
                    </p>
                    <div className="space-y-2">
                      {categories.slice(0, 8).map((cat) => (
                        <Link key={cat.id} to={`/shop?category=${cat.id}`} onClick={() => setMegaOpen(false)} className="block text-sm text-slate-700 hover:text-[#c5a880] font-semibold transition-colors">
                          {cat.name}
                        </Link>
                      ))}
                      {categories.length === 0 && <span className="text-xs text-slate-400">Đang tải...</span>}
                    </div>
                  </div>

                  {/* Cột 3 — Tag nhanh */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 border-b border-slate-100 pb-2">
                      Theo kiểu dáng
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_TAGS.map((tag) => (
                        <Link key={tag.value} to={`/shop?tag=${tag.value}`} onClick={() => setMegaOpen(false)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:border-[#c5a880] hover:text-[#c5a880] transition-all"
                        >
                          <TagsOutlined style={{ fontSize: 10 }} />
                          {tag.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="/shop?type=new" onClick={(e) => { e.preventDefault(); navigate('/shop?type=new'); }} className="relative text-slate-800 hover:text-[#c5a880] transition-colors">
            Hàng Mới
            <span className="absolute -top-3 -right-6 bg-red-500 text-[9px] text-white font-bold px-1 py-0.5 rounded uppercase scale-75 animate-pulse">New</span>
          </a>
          <a href="/shop?type=best-seller" onClick={(e) => { e.preventDefault(); navigate('/shop?type=best-seller'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">Hàng Bán Chạy</a>
          <a href="/shop?category=denim" onClick={(e) => { e.preventDefault(); navigate('/shop?category=denim'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">DENIM</a>
          <a href="/shop?type=outlet" onClick={(e) => { e.preventDefault(); navigate('/shop?type=outlet'); }} className="text-red-600 hover:text-red-500 font-bold transition-colors">OUTLET</a>
          <a href="/collections" onClick={(e) => { e.preventDefault(); navigate('/collections'); }} className="text-slate-800 hover:text-[#c5a880] transition-colors">Collection</a>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          <SearchOutlined className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors" />

          {/* Nút địa chỉ — mở modal thêm địa chỉ với GHN dropdown */}
          <EnvironmentOutlined
            className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors"
            onClick={handleAddressClick}
            title="Thêm địa chỉ"
          />

          {/* Giỏ hàng — badge số lượng thật, click vào trang /cart */}
          <Badge count={cartCount} size="small" style={{ backgroundColor: '#c5a880' }}>
            <ShoppingCartOutlined
              className="text-lg cursor-pointer hover:text-[#c5a880] transition-colors"
              onClick={() => { if (onCartClick) onCartClick(); else navigate('/cart'); }}
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
            <button
              onClick={() => navigate('/auth/login')}
              className="h-9 px-6 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-md shadow-black/10"
            >
              Đăng Nhập
            </button>
          )}
        </div>
      </header>

      {/* MODAL THÊM ĐỊA CHỈ — dùng UserAddressFormModal có sẵn với GHN API dropdown */}
      <UserAddressFormModal
        open={addressModalOpen}
        editing={null}
        submitting={addressSubmitting}
        onSubmit={handleAddressSubmit as any}
        onClose={() => setAddressModalOpen(false)}
      />
    </>
  );
};

export default LandingHeader;
