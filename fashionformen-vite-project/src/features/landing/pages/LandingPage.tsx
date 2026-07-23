import React from 'react';
import { Button } from 'antd';
import { 
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import homeBanner from '@/assets/images/men_fashion_home.png';

const LandingPage: React.FC = () => {
  return (
    <>
      {/* HERO SECTION / SLIDER */}
      <div className="relative bg-[#f5f5f5] overflow-hidden min-h-[480px] lg:min-h-[560px] flex items-center">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
            
            {/* LEFT BANNER INFOS */}
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
                  Áp dụng cho tất cả sản phẩm | Từ 12.07 đến 20.07
                </p>
              </div>
              <p className="text-slate-600 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Sở hữu ngay những thiết kế Denim, áo thun và quần thể thao casual thời thượng nhất của mùa giải mới với giá ưu đãi cực lớn.
              </p>
              <div className="pt-2">
                <Button 
                  type="primary"
                  className="h-12 px-8 bg-red-600 hover:bg-red-500 border-none text-white font-bold text-sm rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto lg:mx-0"
                >
                  Mua Ngay <ArrowRightOutlined />
                </Button>
              </div>
            </div>

            {/* RIGHT BANNER IMAGE */}
            <div className="lg:col-span-7 relative h-full flex justify-center items-center">
              <div className="absolute inset-0 bg-[#c5a880]/5 rounded-full filter blur-3xl -z-10" />
              <img
                src={homeBanner}
                alt="New Menswear Collection"
                className="w-full max-w-2xl h-auto object-cover rounded-2xl shadow-2xl border-4 border-white transition-all duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* NEXT/PREV BUTTONS */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-slate-800">
            <LeftOutlined />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-slate-800">
            <RightOutlined />
          </button>
        </div>

        {/* CATEGORY GRID */}
        <section className="py-16 container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-slate-800">Sản phẩm nổi bật</h2>
            <div className="w-16 h-1 bg-[#c5a880] rounded"></div>
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
        </section>
    </>
  );
};

export default LandingPage;
