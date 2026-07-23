import React from 'react';
import { Button } from 'antd';
import { 
  PhoneOutlined, 
  MailOutlined, 
  FacebookOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import logo from '@/assets/images/logo fashion for men.png';

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-[#0b0c10] text-[#c5a880] text-xs pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
        {/* Column 1: Info & Sub */}
        <div className="md:col-span-4 space-y-6">
          <img src={logo} alt="Fashion For Men Logo" className="h-12 w-auto brightness-110 filter" />
          <div className="space-y-3 text-gray-400 font-medium">
            <p className="flex items-center gap-2">
              <PhoneOutlined className="text-[#c5a880] text-sm" />
              <span>Tổng đài CSKH: <strong className="text-white">02873066060</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <MailOutlined className="text-[#c5a880] text-sm" />
              <span>Email: <strong className="text-white">cskh@fashionformen.vn</strong></span>
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">ĐĂNG KÝ NHẬN TIN</h4>
            <p className="text-gray-400 text-xs leading-relaxed">Hãy là người đầu tiên nhận khuyến mãi lớn!</p>
            <div className="flex gap-2 max-w-sm">
              <input 
                type="email" 
                placeholder="Nhập địa chỉ email" 
                className="flex-grow bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#c5a880] transition-colors"
              />
              <Button 
                type="primary"
                className="bg-[#c5a880] hover:bg-[#d4af37] border-none text-[#0d0d0d] font-bold text-xs uppercase tracking-widest px-4 py-2 rounded transition-all"
              >
                Đăng Ký
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">KẾT NỐI VỚI CHÚNG TÔI</h4>
            <div className="flex items-center gap-3 text-lg text-gray-400">
              <a href="#" className="hover:text-[#c5a880] transition-colors"><FacebookOutlined /></a>
              <a href="#" className="hover:text-[#c5a880] transition-colors"><InstagramOutlined /></a>
              <a href="#" className="hover:text-[#c5a880] transition-colors"><YoutubeOutlined /></a>
              <a href="#" className="hover:text-[#c5a880] transition-colors font-bold text-xs border border-gray-400/30 px-1.5 py-0.5 rounded leading-none">Zalo</a>
              <a href="#" className="hover:text-[#c5a880] transition-colors font-bold text-xs border border-gray-400/30 px-1.5 py-0.5 rounded leading-none">Tiktok</a>
            </div>
          </div>
        </div>

        {/* Column 2: Support */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-bold text-white uppercase tracking-wider text-sm">HỖ TRỢ KHÁCH HÀNG</h4>
          <ul className="space-y-2.5 text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi hàng và bảo hành</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách Membership</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách ưu đãi sinh nhật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách giao hàng</a></li>
          </ul>
        </div>

        {/* Column 3: Store System */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-1.5">
            HỆ THỐNG CỬA HÀNG <span className="text-gray-400 text-xs font-normal">(15 CH)</span>
          </h4>
          <div className="space-y-4 text-gray-400">
            <div className="space-y-1">
              <p className="text-white font-bold flex items-center gap-1">
                <EnvironmentOutlined className="text-[#c5a880]" /> HỒ CHÍ MINH <span className="bg-red-500 text-[9px] text-white font-bold px-1 rounded uppercase">New</span>
              </p>
              <p className="text-xs leading-relaxed">Tầng 1 Aeon Mall Bình Tân, 1 Đường Số 17A, Bình Trị Đông B, Bình Tân, Hồ Chí Minh</p>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold flex items-center gap-1">
                <EnvironmentOutlined className="text-[#c5a880]" /> HÀ NỘI
              </p>
              <p className="text-xs leading-relaxed">Tầng 2 Aeon Mall Hà Đông, Dương Nội, Hà Đông, Hà Nội</p>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold flex items-center gap-1">
                <EnvironmentOutlined className="text-[#c5a880]" /> ĐỒNG NAI
              </p>
              <p className="text-xs leading-relaxed">1357 Phạm Văn Thuận, Phường Biên Hòa, Đồng Nai</p>
            </div>
            <a href="#" className="inline-block text-[#c5a880] hover:text-[#d4af37] font-bold underline uppercase tracking-wider pt-2">XEM TẤT CẢ CỬA HÀNG</a>
          </div>
        </div>

        {/* Column 4: Payment Methods */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">PHƯƠNG THỨC THANH TOÁN</h4>
            <div className="flex gap-2">
              <span className="bg-white/5 border border-white/10 text-white font-bold px-3 py-1.5 rounded text-[10px] tracking-wider uppercase">COD</span>
              <span className="bg-white/5 border border-white/10 text-white font-bold px-3 py-1.5 rounded text-[10px] tracking-wider uppercase">CARD</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="inline-block bg-[#005a9c] text-white font-bold px-4 py-2 rounded-lg border border-[#004f87] shadow-lg">
              <span className="text-xs tracking-wider font-sans block text-center">DMCA</span>
              <span className="text-[9px] uppercase font-black text-center block tracking-widest text-[#52b3ff]">PROTECTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="container mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 font-medium">
        <p>© Bản quyền thuộc về FASHIONFORMEN. All rights reserved. Created for Yoedu Course.</p>
        <div className="flex items-center gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
          <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
