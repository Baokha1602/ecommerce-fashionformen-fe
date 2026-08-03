import React, { useMemo, useState } from 'react';
import { Typography, Row, Col, Spin, Empty, Button, Tag, Divider, Breadcrumb, Dropdown } from 'antd';
import { ShoppingOutlined, StarFilled, FireFilled } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { useProductList } from '@/features/catalog/hooks/useProduct';
import { useProductImageList } from '@/features/catalog/hooks/useProductImage';
import { useProductVariantList } from '@/features/catalog/hooks/useProductVariant';
import { useCategoryList } from '@/features/catalog/hooks/useCategory';

const { Title, Text } = Typography;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<{min?: number, max?: number} | null>(null);
  const [sortParam, setSortParam] = useState<string | null>(null);
  const [onSaleParam, setOnSaleParam] = useState<boolean>(false);

  // Sync URL params to state when location changes
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && !isNaN(parseInt(cat))) setSelectedCategoryIds([parseInt(cat)]);
    
    const brand = params.get('brand');
    if (brand && !isNaN(parseInt(brand))) setSelectedBrandIds([parseInt(brand)]);
    
    setSortParam(params.get('sort'));
    setOnSaleParam(params.get('onSale') === 'true');
  }, [location.search]);

  const { data: products, isLoading: isLoadingProducts } = useProductList();
  const { data: images } = useProductImageList();
  const { data: variants } = useProductVariantList();
  const { data: categories } = useCategoryList();

  const enrichedProducts = useMemo(() => {
    if (!products) return [];

    // Bước 1: Map dữ liệu để lấy hình ảnh và tính toán giá thấp nhất cho từng sản phẩm
    let mappedProducts = products.map((product) => {
      // Tìm ảnh chính (hoặc ảnh đầu tiên)
      const productImages = images?.filter((img) => img.productId === product.id) || [];
      const mainImage = productImages.find((img) => img.isMainImage)?.image 
                     || productImages[0]?.image 
                     || 'https://placehold.co/400x500?text=No+Image';

      // Tìm giá thấp nhất từ các biến thể
      const productVariants = variants?.filter((v) => v.productId === product.id) || [];
      const lowestPrice = productVariants.length > 0 
        ? Math.min(...productVariants.map((v) => v.discountPrice || v.price))
        : 0;
      
      const categoryName = categories?.find(c => c.id === product.categoryId)?.name || 'Fashion';

      return {
        ...product,
        mainImage,
        price: lowestPrice,
        categoryName,
        isNew: new Date().getTime() - new Date(product.createdAt || Date.now()).getTime() < 7 * 24 * 60 * 60 * 1000, // 7 days
      };
    });

    // Bước 2: Lọc theo danh mục (nếu có chọn)
    if (selectedCategoryIds.length > 0) {
      mappedProducts = mappedProducts.filter(p => selectedCategoryIds.includes(p.categoryId));
    }

    // Lọc theo thương hiệu
    if (selectedBrandIds.length > 0) {
      mappedProducts = mappedProducts.filter(p => p.brandId && selectedBrandIds.includes(p.brandId));
    }

    // Lọc theo sale (có discount price nhỏ hơn giá gốc)
    if (onSaleParam) {
      mappedProducts = mappedProducts.filter(p => {
        const productVariants = variants?.filter((v) => v.productId === p.id) || [];
        return productVariants.some(v => v.discountPrice && v.discountPrice > 0 && v.discountPrice < v.price);
      });
    }

    // Bước 3: Lọc theo giá
    if (priceRange) {
      if (priceRange.min !== undefined) {
        mappedProducts = mappedProducts.filter(p => p.price >= priceRange.min!);
      }
      if (priceRange.max !== undefined) {
        mappedProducts = mappedProducts.filter(p => p.price <= priceRange.max!);
      }
    }

    // Sắp xếp
    if (sortParam === 'newest') {
      mappedProducts.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    } else if (sortParam === 'bestseller') {
      mappedProducts.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0));
    }

    return mappedProducts;
  }, [products, images, variants, categories, selectedCategoryIds, selectedBrandIds, priceRange, sortParam, onSaleParam]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* ── BREADCRUMB & HEADER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { title: <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Trang chủ</a> },
              { title: 'Cửa hàng' },
            ]}
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
          />
          <Title level={2} className="!mb-0 uppercase tracking-tight font-black text-slate-900">
            Tất Cả Sản Phẩm
          </Title>
          <Text className="text-gray-500 text-sm mt-2 block">
            Khám phá bộ sưu tập thời trang nam mới nhất.
          </Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Row gutter={[32, 32]}>
          {/* ── SIDEBAR (Filters) ── */}
          <Col xs={24} md={6} lg={5}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingOutlined className="text-[#c5a880] text-xl" />
                <Title level={5} className="!mb-0 uppercase tracking-widest text-sm font-bold">Danh Mục</Title>
              </div>
              <Dropdown 
                menu={{ 
                  items: categories?.map(cat => ({ 
                    key: cat.id.toString(), 
                    label: cat.name,
                    className: 'hover:text-[#c5a880] font-medium text-sm py-2' 
                  })) || [{ key: 'empty', label: 'Chưa có danh mục', disabled: true }],
                  onClick: (info) => {
                    const id = parseInt(info.key, 10);
                    if (!isNaN(id) && !selectedCategoryIds.includes(id)) {
                      setSelectedCategoryIds(prev => [...prev, id]);
                    }
                  },
                  style: {
                    maxHeight: '250px',
                    overflowY: 'auto'
                  }
                }} 
                trigger={['hover']} 
                placement="bottomLeft"
              >
                <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 cursor-pointer hover:border-[#c5a880] transition-colors">
                  <span className="font-semibold text-sm text-slate-700">Tất cả danh mục</span>
                  <ShoppingOutlined className="text-[#c5a880]" />
                </div>
              </Dropdown>

              {/* Tags cho các danh mục đã chọn */}
              {selectedCategoryIds.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCategoryIds.map(id => {
                    const cat = categories?.find(c => c.id === id);
                    return (
                      <Tag 
                        key={id} 
                        closable 
                        onClose={() => setSelectedCategoryIds(prev => prev.filter(cId => cId !== id))}
                        className="!m-0 rounded-full px-3 py-1 bg-amber-50 text-amber-700 border-amber-200 flex items-center font-semibold text-xs"
                      >
                        {cat?.name || 'Unknown'}
                      </Tag>
                    );
                  })}
                </div>
              )}
              
              <Divider className="my-6" />
              
              <Title level={5} className="!mb-4 uppercase tracking-widest text-sm font-bold">Lọc theo giá</Title>
              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li 
                  className={`cursor-pointer transition-colors ${priceRange?.max === 500000 ? 'text-[#c5a880] font-bold' : 'hover:text-[#c5a880]'}`}
                  onClick={() => setPriceRange({ max: 500000 })}
                >
                  Dưới 500,000₫
                </li>
                <li 
                  className={`cursor-pointer transition-colors ${priceRange?.min === 500000 && priceRange?.max === 1000000 ? 'text-[#c5a880] font-bold' : 'hover:text-[#c5a880]'}`}
                  onClick={() => setPriceRange({ min: 500000, max: 1000000 })}
                >
                  500k - 1 Triệu
                </li>
                <li 
                  className={`cursor-pointer transition-colors ${priceRange?.min === 1000000 && !priceRange?.max ? 'text-[#c5a880] font-bold' : 'hover:text-[#c5a880]'}`}
                  onClick={() => setPriceRange({ min: 1000000 })}
                >
                  Trên 1 Triệu
                </li>
              </ul>
              
              {/* Nút xóa bộ lọc giá */}
              {priceRange && (
                <div 
                  className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-semibold cursor-pointer hover:bg-red-100 transition-colors"
                  onClick={() => setPriceRange(null)}
                >
                  ✕ Bỏ lọc giá
                </div>
              )}
            </div>
          </Col>

          {/* ── PRODUCT GRID ── */}
          <Col xs={24} md={18} lg={19}>
            {isLoadingProducts ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : enrichedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <Empty description="Không tìm thấy sản phẩm nào" />
                <Button 
                  type="primary" 
                  onClick={() => {
                    navigate('/shop');
                    setSelectedCategoryIds([]);
                    setSelectedBrandIds([]);
                    setPriceRange(null);
                    setSortParam(null);
                    setOnSaleParam(false);
                  }}
                  className="mt-4 bg-[#000] hover:bg-[#c5a880] border-none rounded-full px-8 uppercase text-xs font-bold tracking-widest"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <Row gutter={[24, 32]}>
                {enrichedProducts.map((product) => (
                  <Col xs={12} sm={12} lg={8} xl={6} key={product.id}>
                    <div 
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 h-full flex flex-col relative"
                      onClick={() => navigate(`/shop/${product.id}`)}
                    >
                      {/* Bages */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                        {product.isNew && (
                          <Tag color="#f5222d" className="!m-0 !rounded-full !border-none font-bold uppercase text-[10px] px-2 shadow-sm">
                            Mới
                          </Tag>
                        )}
                        {product.soldQuantity > 100 && (
                          <Tag color="#faad14" className="!m-0 !rounded-full !border-none font-bold uppercase text-[10px] px-2 shadow-sm flex items-center gap-1">
                            <FireFilled /> Hot
                          </Tag>
                        )}
                      </div>

                      {/* Image */}
                      <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            e.currentTarget.src = 'https://res.cloudinary.com/dcbryptkx/image/upload/v1707289871/placeholder-image-400x500_u8xwnd.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                          <div className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-black hover:text-white transition-colors">
                            Xem Chi Tiết
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow">
                        <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">
                          {product.categoryName}
                        </Text>
                        <Title level={5} className="!mb-2 text-sm !font-bold line-clamp-2 text-slate-800 group-hover:text-[#c5a880] transition-colors">
                          {product.name}
                        </Title>
                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <Text className="font-black text-lg text-slate-900">
                            {product.price > 0 ? formatPrice(product.price) : 'Liên hệ'}
                          </Text>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <StarFilled className="text-yellow-400" />
                            <span>5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShopPage;
