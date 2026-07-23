import React, { useState } from 'react';
import {
  Button,
  Tag,
  Badge,
  Rate,
  InputNumber,
  Divider,
  Tabs,
  Typography,
  Space,
  Breadcrumb,
  message,
} from 'antd';
import {
  ShoppingCartOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  ShareAltOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  ReloadOutlined,
  TagOutlined,
  CheckOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

// ── Dummy Data ────────────────────────────────────────────────
const PRODUCT = {
  id: 'P001',
  sku: 'POLO-SLIM-001',
  name: 'Áo Polo SlimFit Premium Cotton',
  brand: 'FashionForMen',
  category: 'Áo Polo',
  rating: 4.7,
  reviewCount: 128,
  basePrice: 450000,
  salePrice: 382500,
  discountPercent: 15,
  inStock: true,
  stockQty: 42,
  tags: ['#Hot', '#NewArrival', '#SummerCollection'],
  description:
    'Áo Polo SlimFit được may từ cotton 100% cao cấp, co giãn 4 chiều. Form slim giúp tôn dáng, phù hợp đi làm, dạo phố hay các buổi gặp mặt casual.',
  images: [
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f43?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop',
  ],
  colors: [
    { id: 'navy', label: 'Navy', hex: '#001f5b' },
    { id: 'white', label: 'Trắng', hex: '#f5f5f5' },
    { id: 'black', label: 'Đen', hex: '#111111' },
    { id: 'khaki', label: 'Khaki', hex: '#c5a880' },
    { id: 'gray', label: 'Xám', hex: '#6b7280' },
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  vouchers: [
    { code: 'SUMMER15', label: 'Giảm 15% tối đa 50K', type: 'PERCENTAGE' },
    { code: 'FREESHIP', label: 'Miễn phí vận chuyển', type: 'FIXED' },
    { code: 'NEWUSER', label: 'Giảm 30K cho đơn đầu', type: 'FIXED' },
  ],
};

const REVIEWS_DUMMY = [
  {
    id: 1,
    user: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/40?img=1',
    rating: 5,
    date: '12/07/2026',
    comment: 'Áo rất đẹp, chất vải mát, mặc thoải mái. Giao hàng nhanh. Sẽ ủng hộ shop dài dài!',
  },
  {
    id: 2,
    user: 'Trần Minh B',
    avatar: 'https://i.pravatar.cc/40?img=8',
    rating: 4,
    date: '08/07/2026',
    comment: 'Chất lượng ổn, form chuẩn. Màu navy đẹp hơn tưởng tượng. Sẽ mua thêm.',
  },
  {
    id: 3,
    user: 'Lê Hoàng C',
    avatar: 'https://i.pravatar.cc/40?img=12',
    rating: 5,
    date: '01/07/2026',
    comment: 'Mua làm quà sinh nhật cho bạn, shop đóng gói rất cẩn thận và đẹp. 5 sao xứng đáng.',
  },
];

// ── Helper ────────────────────────────────────────────────────
const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// ── Main Component ────────────────────────────────────────────
const ProductDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('navy');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = () => {
    messageApi.success({
      content: `Đã thêm ${quantity} sản phẩm vào giỏ hàng!`,
      icon: <ShoppingCartOutlined style={{ color: '#c5a880' }} />,
    });
  };

  const handleBuyNow = () => {
    messageApi.loading({ content: 'Đang chuyển đến trang thanh toán...', duration: 1.5 });
  };

  return (
    <>
      {contextHolder}
      <div className="bg-white min-h-screen">
        {/* ── BREADCRUMB ─────────────────────────────────────── */}
        <div className="container mx-auto px-6 py-4">
          <Breadcrumb
            items={[
              { title: <Link to="/">Trang chủ</Link> },
              { title: <Link to="/shop">Cửa hàng</Link> },
              { title: PRODUCT.category },
              { title: PRODUCT.name },
            ]}
          />
        </div>

        {/* ── MAIN GRID ──────────────────────────────────────── */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

            {/* ════════ LEFT — IMAGE GALLERY ══════════════════ */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-50 aspect-[4/5] group">
                <img
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                {/* Discount badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow">
                    -{PRODUCT.discountPercent}%
                  </span>
                </div>
                {/* Wishlist button */}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
                >
                  <HeartOutlined
                    className={`text-lg transition-colors ${wishlisted ? 'text-red-500' : 'text-gray-400'}`}
                    style={{ color: wishlisted ? '#ef4444' : undefined }}
                  />
                </button>
                {/* Share button */}
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all">
                  <ShareAltOutlined className="text-gray-500" />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-3">
                {PRODUCT.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`overflow-hidden rounded-xl aspect-square border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-[#c5a880] shadow-md scale-[0.97]'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ════════ RIGHT — PRODUCT INFO ══════════════════ */}
            <div className="flex flex-col gap-5 py-2">
              {/* Brand + SKU */}
              <div className="flex items-center justify-between">
                <Text className="text-[#c5a880] font-bold text-xs uppercase tracking-widest">
                  {PRODUCT.brand}
                </Text>
                <Text className="text-gray-400 text-xs">Mã SP: {PRODUCT.sku}</Text>
              </div>

              {/* Product name */}
              <Title level={2} className="!mb-0 !text-2xl lg:!text-3xl !font-black !leading-tight">
                {PRODUCT.name}
              </Title>

              {/* Rating + Reviews */}
              <div className="flex items-center gap-3">
                <Rate
                  disabled
                  defaultValue={PRODUCT.rating}
                  allowHalf
                  character={<StarFilled style={{ fontSize: 14 }} />}
                  style={{ color: '#c5a880' }}
                />
                <Text className="text-sm text-gray-500">
                  <strong className="text-slate-700">{PRODUCT.rating}</strong> / 5
                  ({PRODUCT.reviewCount} đánh giá)
                </Text>
              </div>

              {/* Price block */}
              <div className="flex items-baseline gap-4 bg-slate-50 rounded-xl px-5 py-4">
                <span className="text-3xl font-black text-red-600">
                  {formatPrice(PRODUCT.salePrice)}
                </span>
                <span className="text-lg text-gray-400 line-through font-normal">
                  {formatPrice(PRODUCT.basePrice)}
                </span>
                <span className="text-sm bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-lg">
                  Tiết kiệm {formatPrice(PRODUCT.basePrice - PRODUCT.salePrice)}
                </span>
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2">
                <Badge
                  status={PRODUCT.inStock ? 'success' : 'error'}
                  text={
                    <Text className="text-sm font-medium">
                      {PRODUCT.inStock
                        ? `Còn hàng (${PRODUCT.stockQty} sản phẩm)`
                        : 'Hết hàng'}
                    </Text>
                  }
                />
              </div>

              {/* Voucher tags */}
              <div>
                <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  <TagOutlined className="mr-1" />
                  Ưu đãi áp dụng
                </Text>
                <Space wrap>
                  {PRODUCT.vouchers.map((v) => (
                    <Tag
                      key={v.code}
                      color="gold"
                      bordered
                      className="!rounded-lg !px-3 !py-1 !text-xs !font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        background: '#fef9ec',
                        borderColor: '#c5a880',
                        color: '#8a6a2a',
                      }}
                    >
                      🎫 {v.label}
                    </Tag>
                  ))}
                </Space>
              </div>

              <Divider className="!my-1" />

              {/* Color selector */}
              <div>
                <Text className="text-sm font-semibold text-gray-700 block mb-3">
                  Màu sắc:{' '}
                  <span className="font-bold text-slate-900">
                    {PRODUCT.colors.find((c) => c.id === selectedColor)?.label}
                  </span>
                </Text>
                <div className="flex gap-3 flex-wrap">
                  {PRODUCT.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      title={color.label}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${
                        selectedColor === color.id
                          ? 'border-[#c5a880] scale-110 shadow-md'
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.id && (
                        <CheckOutlined
                          className="absolute inset-0 flex items-center justify-center text-white text-xs"
                          style={{
                            color: ['white', 'khaki'].includes(color.id) ? '#333' : '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Text className="text-sm font-semibold text-gray-700">
                    Kích cỡ:{' '}
                    <span className="font-bold text-slate-900">{selectedSize}</span>
                  </Text>
                  <button className="text-xs text-[#c5a880] underline hover:text-[#a08060] transition-colors">
                    Hướng dẫn chọn size
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 text-sm font-bold transition-all hover:border-[#c5a880] ${
                        selectedSize === size
                          ? 'bg-[#c5a880] border-[#c5a880] text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity picker */}
              <div>
                <Text className="text-sm font-semibold text-gray-700 block mb-3">
                  Số lượng:
                </Text>
                <InputNumber
                  min={1}
                  max={PRODUCT.stockQty}
                  value={quantity}
                  onChange={(val) => setQuantity(val || 1)}
                  size="large"
                  controls
                  style={{ borderRadius: 10 }}
                  className="!w-32"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  className="flex-1 h-12 !rounded-xl !border-[#c5a880] !text-[#c5a880] !font-bold hover:!bg-[#c5a880]/10 transition-all"
                >
                  THÊM VÀO GIỎ
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<ThunderboltOutlined />}
                  onClick={handleBuyNow}
                  className="flex-1 h-12 !rounded-xl !font-bold !text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(197,168,128,0.4)',
                  }}
                >
                  MUA NGAY
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { icon: <TruckOutlined />, label: 'Miễn phí ship', sub: 'Đơn từ 300K' },
                  { icon: <SafetyCertificateOutlined />, label: 'Chính hãng 100%', sub: 'Bảo đảm chất lượng' },
                  { icon: <ReloadOutlined />, label: 'Đổi trả dễ', sub: 'Trong vòng 30 ngày' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 gap-1"
                  >
                    <span className="text-[#c5a880] text-xl">{item.icon}</span>
                    <Text className="text-xs font-bold text-slate-700">{item.label}</Text>
                    <Text className="text-[10px] text-gray-400">{item.sub}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════════ TABS: MÔ TẢ + ĐÁNH GIÁ ══════════════════ */}
          <div className="mt-16">
            <Tabs
              defaultActiveKey="description"
              size="large"
              items={[
                {
                  key: 'description',
                  label: 'Mô tả sản phẩm',
                  children: (
                    <div className="py-6 max-w-3xl">
                      <Paragraph className="text-gray-600 leading-relaxed text-base">
                        {PRODUCT.description}
                      </Paragraph>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600">
                        {['Chất liệu: Cotton 100% cao cấp, 200gsm', 'Co giãn 4 chiều thoải mái', 'Form: Slim Fit — tôn dáng', 'Cổ Polo 3 cúc không bung', 'Không phai màu sau 50 lần giặt'].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckOutlined style={{ color: '#c5a880', marginTop: 2 }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                },
                {
                  key: 'reviews',
                  label: `Đánh giá (${PRODUCT.reviewCount})`,
                  children: (
                    <div className="py-6 space-y-6 max-w-2xl">
                      {/* Rating summary */}
                      <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-2xl">
                        <div className="text-center">
                          <div className="text-5xl font-black text-slate-800">{PRODUCT.rating}</div>
                          <Rate
                            disabled
                            defaultValue={PRODUCT.rating}
                            allowHalf
                            style={{ color: '#c5a880', fontSize: 14 }}
                          />
                          <div className="text-xs text-gray-400 mt-1">{PRODUCT.reviewCount} đánh giá</div>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2 text-xs">
                              <span className="text-gray-500 w-4">{star}★</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-[#c5a880] h-1.5 rounded-full"
                                  style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                                />
                              </div>
                              <span className="text-gray-400 w-8">
                                {star === 5 ? '70%' : star === 4 ? '20%' : '5%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Review list */}
                      {REVIEWS_DUMMY.map((review) => (
                        <div key={review.id} className="flex gap-4">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-slate-700 text-sm">
                                {review.user}
                              </span>
                              <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <Rate
                              disabled
                              defaultValue={review.rating}
                              style={{ fontSize: 12, color: '#c5a880' }}
                            />
                            <Paragraph className="!mb-0 text-sm text-gray-600 mt-1">
                              {review.comment}
                            </Paragraph>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
