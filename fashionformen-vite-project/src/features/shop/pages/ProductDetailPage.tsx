import React, { useState } from 'react';
import {
  Button,
  Badge,
  Rate,
  InputNumber,
  Divider,
  Tabs,
  Typography,
  Breadcrumb,
  message,
  Spin,
  Empty,
} from 'antd';
import {
  ShoppingCartOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  ShareAltOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  ReloadOutlined,
  StarFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useProduct } from '@/features/catalog/hooks/useProduct';
import { useProductImageList } from '@/features/catalog/hooks/useProductImage';
import { useProductVariantList } from '@/features/catalog/hooks/useProductVariant';
import { useProductReviewList } from '@/features/catalog/hooks/useProductReview';
import { useBrandList } from '@/features/catalog/hooks/useBrand';
import { useCategoryList } from '@/features/catalog/hooks/useCategory';

const { Title, Text, Paragraph } = Typography;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// ── Main Component ────────────────────────────────────────────
const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const productId = slug ? parseInt(slug, 10) : NaN;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // ── API calls ──────────────────────────────────────────────
  const { data: product, isLoading: isLoadingProduct } = useProduct(productId);
  const { data: allImages } = useProductImageList();
  const { data: allVariants } = useProductVariantList();
  const { data: allReviews } = useProductReviewList();
  const { data: brands } = useBrandList();
  const { data: categories } = useCategoryList();

  // ── Derived data ──────────────────────────────────────────
  const productImages = allImages?.filter(img => img.productId === productId) ?? [];
  const galleryImages = productImages.map(img => img.image);

  const productVariants = allVariants?.filter(v => v.productId === productId) ?? [];
  const selectedVariant = selectedVariantId
    ? productVariants.find(v => v.id === selectedVariantId)
    : productVariants[0];

  const productReviews = allReviews?.filter(r => r.productId === productId) ?? [];
  const avgRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 0;

  const brandName = brands?.find(b => b.id === product?.brandId)?.name ?? '';
  const categoryName = categories?.find(c => c.id === product?.categoryId)?.name ?? '';

  const displayPrice = selectedVariant?.discountPrice ?? selectedVariant?.price ?? 0;
  const originalPrice = selectedVariant?.price ?? 0;
  const hasDiscount = selectedVariant?.discountPrice != null && selectedVariant.discountPrice < originalPrice;
  const discountPercent = hasDiscount
    ? Math.round((1 - (selectedVariant!.discountPrice! / originalPrice)) * 100)
    : 0;

  const inStock = (selectedVariant?.stockTotal ?? 0) > 0;

  // ── Handlers ──────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!selectedVariant) {
      messageApi.warning('Vui lòng chọn biến thể sản phẩm!');
      return;
    }
    messageApi.success({
      content: `Đã thêm ${quantity} sản phẩm vào giỏ hàng!`,
      icon: <ShoppingCartOutlined style={{ color: '#c5a880' }} />,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      messageApi.warning('Vui lòng chọn biến thể sản phẩm!');
      return;
    }
    messageApi.loading({ content: 'Đang chuyển đến trang thanh toán...', duration: 1.5 });
  };

  // ── Loading / Error states ─────────────────────────────────
  if (isNaN(productId)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Empty description="ID sản phẩm không hợp lệ">
          <Button onClick={() => navigate('/shop')}>Quay lại cửa hàng</Button>
        </Empty>
      </div>
    );
  }

  if (isLoadingProduct) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Empty description="Không tìm thấy sản phẩm">
          <Button type="primary" onClick={() => navigate('/shop')}>
            <ArrowLeftOutlined /> Quay lại cửa hàng
          </Button>
        </Empty>
      </div>
    );
  }

  const displayImages = galleryImages.length > 0
    ? galleryImages
    : ['https://placehold.co/800x1000?text=No+Image'];

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
              ...(categoryName ? [{ title: categoryName }] : []),
              { title: product.name },
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
                  src={displayImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                {/* Discount badge */}
                {hasDiscount && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow">
                      -{discountPercent}%
                    </span>
                  </div>
                )}
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
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {displayImages.map((img, idx) => (
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
              )}
            </div>

            {/* ════════ RIGHT — PRODUCT INFO ══════════════════ */}
            <div className="flex flex-col gap-5 py-2">
              {/* Brand + ID */}
              <div className="flex items-center justify-between">
                <Text className="text-[#c5a880] font-bold text-xs uppercase tracking-widest">
                  {brandName}
                </Text>
                <Text className="text-gray-400 text-xs">Mã SP: #{product.id}</Text>
              </div>

              {/* Product name */}
              <Title level={2} className="!mb-0 !text-2xl lg:!text-3xl !font-black !leading-tight">
                {product.name}
              </Title>

              {/* Rating + Reviews */}
              {productReviews.length > 0 && (
                <div className="flex items-center gap-3">
                  <Rate
                    disabled
                    value={avgRating}
                    allowHalf
                    character={<StarFilled style={{ fontSize: 14 }} />}
                    style={{ color: '#c5a880' }}
                  />
                  <Text className="text-sm text-gray-500">
                    <strong className="text-slate-700">{avgRating.toFixed(1)}</strong> / 5
                    ({productReviews.length} đánh giá)
                  </Text>
                </div>
              )}

              {/* Price block */}
              {selectedVariant ? (
                <div className="flex items-baseline gap-4 bg-slate-50 rounded-xl px-5 py-4">
                  <span className="text-3xl font-black text-red-600">
                    {formatPrice(displayPrice)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-gray-400 line-through font-normal">
                        {formatPrice(originalPrice)}
                      </span>
                      <span className="text-sm bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-lg">
                        Tiết kiệm {formatPrice(originalPrice - displayPrice)}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl px-5 py-4">
                  <Text className="text-gray-400">Chưa có thông tin giá</Text>
                </div>
              )}

              {/* Stock status */}
              <div className="flex items-center gap-2">
                <Badge
                  status={inStock ? 'success' : 'error'}
                  text={
                    <Text className="text-sm font-medium">
                      {selectedVariant
                        ? inStock
                          ? `Còn hàng (${selectedVariant.stockTotal} sản phẩm)`
                          : 'Hết hàng'
                        : 'Chưa có biến thể'}
                    </Text>
                  }
                />
              </div>

              <Divider className="!my-1" />

              {/* Variant selector */}
              {productVariants.length > 0 && (
                <div>
                  <Text className="text-sm font-semibold text-gray-700 block mb-3">
                    Biến thể:{' '}
                    <span className="font-bold text-slate-900">
                      {selectedVariant?.name ?? 'Chưa chọn'}
                    </span>
                  </Text>
                  <div className="flex gap-2 flex-wrap">
                    {productVariants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariantId(variant.id)}
                        disabled={variant.stockTotal === 0}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all
                          ${selectedVariant?.id === variant.id
                            ? 'bg-[#c5a880] border-[#c5a880] text-white shadow-md'
                            : variant.stockTotal === 0
                              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-[#c5a880]'
                          }`}
                      >
                        {variant.name}
                        {variant.stockTotal === 0 && ' (Hết)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity picker */}
              <div>
                <Text className="text-sm font-semibold text-gray-700 block mb-3">
                  Số lượng:
                </Text>
                <InputNumber
                  min={1}
                  max={selectedVariant?.stockTotal ?? 1}
                  value={quantity}
                  onChange={(val) => setQuantity(val || 1)}
                  size="large"
                  controls
                  style={{ borderRadius: 10 }}
                  className="!w-32"
                  disabled={!inStock}
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-1 h-12 !rounded-xl !border-[#c5a880] !text-[#c5a880] !font-bold hover:!bg-[#c5a880]/10 transition-all"
                >
                  THÊM VÀO GIỎ
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<ThunderboltOutlined />}
                  onClick={handleBuyNow}
                  disabled={!inStock}
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
                      {product.description ? (
                        <Paragraph className="text-gray-600 leading-relaxed text-base">
                          {product.description}
                        </Paragraph>
                      ) : (
                        <Text className="text-gray-400 italic">Chưa có mô tả cho sản phẩm này.</Text>
                      )}
                    </div>
                  ),
                },
                {
                  key: 'reviews',
                  label: `Đánh giá (${productReviews.length})`,
                  children: (
                    <div className="py-6 space-y-6 max-w-2xl">
                      {productReviews.length === 0 ? (
                        <Empty description="Chưa có đánh giá nào" />
                      ) : (
                        <>
                          {/* Rating summary */}
                          <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-2xl">
                            <div className="text-center">
                              <div className="text-5xl font-black text-slate-800">{avgRating.toFixed(1)}</div>
                              <Rate
                                disabled
                                value={avgRating}
                                allowHalf
                                style={{ color: '#c5a880', fontSize: 14 }}
                              />
                              <div className="text-xs text-gray-400 mt-1">{productReviews.length} đánh giá</div>
                            </div>
                          </div>

                          {/* Review list */}
                          {productReviews.map((review) => (
                            <div key={review.id} className="flex gap-4 border-b border-gray-100 pb-4">
                              <div className="w-10 h-10 rounded-full bg-[#c5a880] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {review.userId}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-slate-700 text-sm">
                                    Khách hàng #{review.userId}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                  </span>
                                </div>
                                <Rate
                                  disabled
                                  value={review.rating}
                                  style={{ fontSize: 12, color: '#c5a880' }}
                                />
                                <Paragraph className="!mb-0 text-sm text-gray-600 mt-1">
                                  {review.comment}
                                </Paragraph>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
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
