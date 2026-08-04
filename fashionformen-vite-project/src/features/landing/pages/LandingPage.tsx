import React, { useEffect, useRef, useState } from 'react';
import { Button, Skeleton } from 'antd';
import {
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
  AppstoreOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/redux/hooks';
import { ensureArray } from '@/shared/lib/ensure-array';
import homeBanner from '@/assets/images/men_fashion_home.png';


const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Redux state — dùng dữ liệu thật
  const { list: bannerList, loading: bannersLoading } = useAppSelector((s) => s.banners);
  const { list: brandList, loading: brandsLoading } = useAppSelector((s) => s.brands);
  const { list: categoryList, loading: categoriesLoading } = useAppSelector((s) => s.category);

  // Banners thật (chỉ active, sắp xếp theo displayOrder)
  const activeBanners = ensureArray(bannerList)
    .filter((b) => b.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const activeBrands = ensureArray(brandList).filter((b) => b.isActive !== false);
  const categories = ensureArray(categoryList);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch dữ liệu thật khi mount
  // NOTE: Đã chuyển phần dispatch(fetchAll...) lên StorefrontLayout để Header luôn có dữ liệu

  // Auto slide
  useEffect(() => {
    const total = activeBanners.length;
    if (total <= 1) return;
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, 4000);
    return () => { if (sliderTimerRef.current) clearInterval(sliderTimerRef.current); };
  }, [activeBanners.length]);

  const prevSlide = () => {
    const total = activeBanners.length || 1;
    setCurrentSlide((p) => (p - 1 + total) % total);
  };
  const nextSlide = () => {
    const total = activeBanners.length || 1;
    setCurrentSlide((p) => (p + 1) % total);
  };

  // ── Render hero từ banner thật hoặc fallback mặc định ────────────────
  const renderHero = () => {
    // Nếu đang load lần đầu
    if (bannersLoading && activeBanners.length === 0) {
      return (
        <div className="relative bg-[#f5f5f5] overflow-hidden min-h-[480px] lg:min-h-[560px] flex items-center">
          <div className="container mx-auto px-6 py-12">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        </div>
      );
    }

    // Nếu có banners thật — dùng banner thật làm nền
    if (activeBanners.length > 0) {
      const banner = activeBanners[currentSlide];
      return (
        <div className="relative overflow-hidden min-h-[420px] lg:min-h-[500px] flex items-center bg-[#0d0d0d]">
          {/* Slide images */}
          {activeBanners.map((b, idx) => (
            <div
              key={b.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: idx === currentSlide ? 1 : 0 }}
            >
              <img
                src={b.imageUrl}
                alt={b.title || `Banner ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{ opacity: 0.65 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>
          ))}

          {/* Content overlay */}
          <div className="relative z-10 container mx-auto px-6 py-16">
            <div className="max-w-xl space-y-5">
              <span className="inline-block text-[#c5a880] text-xs font-bold uppercase tracking-widest border-b-2 border-[#c5a880] pb-1">
                Fashion For Men — 2026
              </span>
              {banner.title && (
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white uppercase">
                  {banner.title}
                </h1>
              )}
              <div className="flex gap-3 pt-2">
                {banner.linkUrl ? (
                  <a href={banner.linkUrl}>
                    <Button
                      type="primary"
                      className="h-11 px-7 border-none text-white font-bold text-sm rounded-full transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
                    >
                      Khám phá <ArrowRightOutlined />
                    </Button>
                  </a>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => navigate('/shop')}
                    className="h-11 px-7 border-none text-white font-bold text-sm rounded-full transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
                  >
                    Mua ngay <ArrowRightOutlined />
                  </Button>
                )}
              </div>

              {/* Dots indicator */}
              {activeBanners.length > 1 && (
                <div className="flex gap-2 pt-2">
                  {activeBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className="rounded-full transition-all"
                      style={{
                        width: idx === currentSlide ? 24 : 8,
                        height: 8,
                        background: idx === currentSlide ? '#c5a880' : 'rgba(255,255,255,0.4)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Prev / Next buttons */}
          {activeBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center shadow-md transition-all text-white z-20"
              >
                <LeftOutlined />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center shadow-md transition-all text-white z-20"
              >
                <RightOutlined />
              </button>
            </>
          )}
        </div>
      );
    }

    // Fallback hero mặc định (khi chưa có banner nào)
    return (
      <div className="relative bg-[#f5f5f5] overflow-hidden min-h-[480px] lg:min-h-[560px] flex items-center">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
          <div className="lg:col-span-5 space-y-6 z-10 text-center lg:text-left">
            <span className="inline-block text-[#c5a880] text-xs font-bold uppercase tracking-widest border-b-2 border-[#c5a880] pb-1">
              The Originals Legacy 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-[#0d0d0d] uppercase">
              BỨT TỐC <br />
              <span className="text-red-600">CHẶNG CUỐI</span>
            </h1>
            <div className="space-y-2">
              <p className="text-slate-800 text-xl font-extrabold tracking-wider uppercase bg-slate-200/60 inline-block px-4 py-1.5 rounded-md">
                LIMITED DEAL <span className="text-red-600">15% OFF</span>
              </p>
              <p className="text-slate-500 text-sm font-semibold block">
                Áp dụng cho tất cả sản phẩm
              </p>
            </div>
            <p className="text-slate-600 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              Sở hữu ngay những thiết kế Denim, áo thun và quần thể thao casual thời thượng nhất.
            </p>
            <div className="pt-2">
              <Button
                type="primary"
                onClick={() => navigate('/shop')}
                className="h-12 px-8 border-none text-white font-bold text-sm rounded-full transition-all hover:scale-105"
                style={{ background: '#e53e3e' }}
              >
                Mua Ngay <ArrowRightOutlined />
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7 relative h-full flex justify-center items-center">
            <div className="absolute inset-0 bg-[#c5a880]/5 rounded-full filter blur-3xl -z-10" />
            <img
              src={homeBanner}
              alt="New Menswear Collection"
              className="w-full max-w-2xl h-auto object-cover rounded-2xl shadow-2xl border-4 border-white transition-all duration-500 hover:scale-[1.01]"
            />
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-slate-800"
        >
          <LeftOutlined />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-slate-800"
        >
          <RightOutlined />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* ── HERO / BANNER SLIDER (THẬT) ────────────────────────── */}
      {renderHero()}

      {/* ── DANH MỤC THẬT ────────────────────────────────────────── */}
      {(categories.length > 0 || categoriesLoading) && (
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-3 mb-8">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-slate-800">
                Danh mục sản phẩm
              </h2>
              <div className="w-12 h-1 bg-[#c5a880] rounded" />
            </div>

            {categoriesLoading ? (
              <div className="flex gap-4 justify-center flex-wrap">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton.Button key={i} active style={{ width: 100, height: 40, borderRadius: 20 }} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {/* Nút "Tất cả" */}
                <Link
                  to="/shop"
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-900 bg-slate-900 text-white font-bold text-sm hover:bg-[#c5a880] hover:border-[#c5a880] transition-all shadow-sm"
                >
                  <AppstoreOutlined />
                  Tất cả
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.id}`}
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all hover:scale-105 shadow-xs"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── THƯƠNG HIỆU THẬT ─────────────────────────────────────── */}
      {(activeBrands.length > 0 || brandsLoading) && (
        <section className="py-10 bg-[#fafafa] border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center space-y-3 mb-8">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-slate-800">
                Thương hiệu nổi bật
              </h2>
              <div className="w-12 h-1 bg-[#c5a880] rounded" />
            </div>

            {brandsLoading ? (
              <div className="flex gap-6 justify-center flex-wrap">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton.Avatar key={i} active size={72} shape="square" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center items-center">
                {activeBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/shop?brand=${brand.id}`}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden transition-all group-hover:shadow-lg group-hover:scale-105 border-2 border-transparent group-hover:border-[#c5a880]"
                      style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                    >
                      {brand.logoUrl ? (
                        <img
                          src={brand.logoUrl}
                          alt={brand.name}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <ShopOutlined style={{ fontSize: 28, color: '#c5a880' }} />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-[#c5a880] transition-colors uppercase tracking-wide">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SẢN PHẨM NỔI BẬT (placeholder — chờ Products API) ────── */}
      <section className="py-16 container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-3 mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-slate-800">
            Sản phẩm nổi bật
          </h2>
          <div className="w-16 h-1 bg-[#c5a880] rounded" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Product Card 1 */}
          <div className="group cursor-pointer space-y-3">
            <div className="relative overflow-hidden bg-slate-100 rounded-xl aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop"
                alt="Denim Shirt"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#c5a880] text-xs font-bold text-white px-2 py-0.5 rounded">New</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Denim</p>
              <h3 className="text-sm font-semibold text-slate-700 group-hover:text-[#c5a880] transition-colors truncate">Áo Sơ Mi Denim Classic</h3>
              <p className="text-sm font-bold text-slate-900">450,000đ</p>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="group cursor-pointer space-y-3">
            <div className="relative overflow-hidden bg-slate-100 rounded-xl aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop"
                alt="Polo Shirt"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-red-600 text-xs font-bold text-white px-2 py-0.5 rounded">-15%</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Polo</p>
              <h3 className="text-sm font-semibold text-slate-700 group-hover:text-[#c5a880] transition-colors truncate">Áo Polo Slimfit Cotton</h3>
              <p className="text-sm font-bold text-slate-900">382,500đ <span className="text-xs text-slate-400 line-through font-normal ml-1">450,000đ</span></p>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="group cursor-pointer space-y-3">
            <div className="relative overflow-hidden bg-slate-100 rounded-xl aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop"
                alt="Blazer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Suite</p>
              <h3 className="text-sm font-semibold text-slate-700 group-hover:text-[#c5a880] transition-colors truncate">Áo Blazer Nam Premium</h3>
              <p className="text-sm font-bold text-slate-900">1,250,000đ</p>
            </div>
          </div>

          {/* Product Card 4 */}
          <div className="group cursor-pointer space-y-3">
            <div className="relative overflow-hidden bg-slate-100 rounded-xl aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
                alt="Casual Trousers"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Trousers</p>
              <h3 className="text-sm font-semibold text-slate-700 group-hover:text-[#c5a880] transition-colors truncate">Quần Tây Nam Hàn Quốc</h3>
              <p className="text-sm font-bold text-slate-900">520,000đ</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            onClick={() => navigate('/shop')}
            style={{
              borderColor: '#c5a880',
              color: '#c5a880',
              borderRadius: 24,
              fontWeight: 700,
              height: 44,
              paddingInline: 32,
            }}
          >
            Xem tất cả sản phẩm <ArrowRightOutlined />
          </Button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
