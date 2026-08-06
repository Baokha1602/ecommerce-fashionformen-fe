import React, { useMemo, useState } from 'react';
import { Spin, Empty, Button, Tag, Select, Switch } from 'antd';
import {
  StarFilled,
  FireFilled,
  FilterOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { useProductList } from '@/features/catalog/hooks/useProduct';
import { useProductImageList } from '@/features/catalog/hooks/useProductImage';
import { useProductVariantList } from '@/features/catalog/hooks/useProductVariant';
import { useCategoryList } from '@/features/catalog/hooks/useCategory';
import { useBrandList } from '@/features/catalog/hooks/useBrand';
import { useTagList } from '@/features/catalog/hooks/useTag';
import { useProductTagList } from '@/features/catalog/hooks/useProductTag';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const PRICE_RANGES = [
  { label: 'Tất cả', min: undefined, max: undefined },
  { label: 'Dưới 300k', min: undefined, max: 300000 },
  { label: '300k – 600k', min: 300000, max: 600000 },
  { label: '600k – 1 triệu', min: 600000, max: 1000000 },
  { label: 'Trên 1 triệu', min: 1000000, max: undefined },
];

const SORT_OPTIONS = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Bán chạy', value: 'bestseller' },
  { label: 'Giá thấp → cao', value: 'price_asc' },
  { label: 'Giá cao → thấp', value: 'price_desc' },
];

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [priceRangeIdx, setPriceRangeIdx] = useState<number>(0);
  const [sortParam, setSortParam] = useState<string>('newest');
  const [onSaleParam, setOnSaleParam] = useState<boolean>(false);
  const [typeParam, setTypeParam] = useState<string | null>(null);
  const [urlTagParam, setUrlTagParam] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync URL params to state when location changes
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && !isNaN(parseInt(cat))) setSelectedCategoryIds([parseInt(cat)]);

    const brand = params.get('brand');
    if (brand && !isNaN(parseInt(brand))) setSelectedBrandIds([parseInt(brand)]);

    const sort = params.get('sort');
    if (sort) setSortParam(sort);

    setOnSaleParam(params.get('onSale') === 'true');
    setTypeParam(params.get('type'));
    // tag param: nếu là số → lọc theo tagId, nếu là slug → lọc theo tên
    const tagParam = params.get('tag');
    if (tagParam) {
      const tagIdNum = parseInt(tagParam, 10);
      if (!isNaN(tagIdNum)) {
        setSelectedTagIds([tagIdNum]);
        setUrlTagParam(null);
      } else {
        setUrlTagParam(tagParam);
      }
    } else {
      setUrlTagParam(null);
    }
  }, [location.search]);

  const { data: products, isLoading: isLoadingProducts } = useProductList();
  const { data: images } = useProductImageList();
  const { data: variants } = useProductVariantList();
  const { data: categories } = useCategoryList();
  const { data: brands } = useBrandList();
  const { data: tags } = useTagList();
  const { data: productTags } = useProductTagList();

  const priceRange = PRICE_RANGES[priceRangeIdx];

  const enrichedProducts = useMemo(() => {
    if (!products) return [];

    let mappedProducts = products.map((product) => {
      const productImages = images?.filter((img) => img.productId === product.id) || [];
      const mainImage =
        productImages.find((img) => img.isMainImage)?.image ||
        productImages[0]?.image ||
        'https://placehold.co/400x500/f5f5f5/c5a880?text=No+Image';

      const productVariants = variants?.filter((v) => v.productId === product.id) || [];
      const prices = productVariants.map((v) => v.discountPrice || v.price).filter(Boolean);
      const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const highestPrice = prices.length > 0 ? Math.max(...prices) : 0;
      const hasDiscount = productVariants.some(
        (v) => v.discountPrice && v.discountPrice > 0 && v.discountPrice < v.price,
      );

      const categoryName = categories?.find((c) => c.id === product.categoryId)?.name || '';

      return {
        ...product,
        mainImage,
        price: lowestPrice,
        highestPrice,
        categoryName,
        hasDiscount,
        isNew:
          new Date().getTime() - new Date(product.createdAt || Date.now()).getTime() <
          30 * 24 * 60 * 60 * 1000,
      };
    });

    if (selectedCategoryIds.length > 0) {
      mappedProducts = mappedProducts.filter((p) =>
        selectedCategoryIds.includes(p.categoryId!),
      );
    }

    if (selectedBrandIds.length > 0) {
      mappedProducts = mappedProducts.filter(
        (p) => p.brandId && selectedBrandIds.includes(p.brandId),
      );
    }

    if (selectedTagIds.length > 0) {
      mappedProducts = mappedProducts.filter((p) => {
        const pTags = productTags?.filter((pt) => pt.productId === p.id) || [];
        return pTags.some((pt) => pt.tagId && selectedTagIds.includes(pt.tagId));
      });
    }

    if (onSaleParam || typeParam === 'outlet') {
      mappedProducts = mappedProducts.filter((p) => p.hasDiscount);
    }

    if (typeParam === 'new') {
      mappedProducts = mappedProducts.filter((p) => p.isNew);
    }

    if (urlTagParam) {
      const searchTag = urlTagParam.toLowerCase().replace(/-/g, ' ');
      mappedProducts = mappedProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTag) ||
          p.categoryName?.toLowerCase().includes(searchTag),
      );
    }

    if (priceRange.min !== undefined) {
      mappedProducts = mappedProducts.filter((p) => p.price >= priceRange.min!);
    }
    if (priceRange.max !== undefined) {
      mappedProducts = mappedProducts.filter((p) => p.price <= priceRange.max!);
    }

    if (sortParam === 'newest') {
      mappedProducts.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
      );
    } else if (sortParam === 'bestseller' || typeParam === 'best-seller') {
      mappedProducts.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0));
    } else if (sortParam === 'price_asc') {
      mappedProducts.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'price_desc') {
      mappedProducts.sort((a, b) => b.price - a.price);
    }

    return mappedProducts;
  }, [
    products,
    images,
    variants,
    categories,
    brands,
    tags,
    productTags,
    selectedCategoryIds,
    selectedBrandIds,
    selectedTagIds,
    priceRangeIdx,
    sortParam,
    onSaleParam,
    typeParam,
    urlTagParam,
  ]);

  const hasActiveFilters =
    selectedCategoryIds.length > 0 ||
    selectedBrandIds.length > 0 ||
    selectedTagIds.length > 0 ||
    priceRangeIdx !== 0 ||
    onSaleParam ||
    typeParam != null ||
    urlTagParam != null;

  const clearAll = () => {
    setSelectedCategoryIds([]);
    setSelectedBrandIds([]);
    setSelectedTagIds([]);
    setPriceRangeIdx(0);
    setOnSaleParam(false);
    setTypeParam(null);
    setUrlTagParam(null);
    navigate('/shop');
  };

  // ── SIDEBAR HELPER ────────────────────────────────────────────────────────
  const selectStyle: React.CSSProperties = {
    width: '100%',
  };
  const selectClass = 'w-full [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-gray-200 [&_.ant-select-selector]:!text-sm [&_.ant-select-selector]:!min-h-[38px]';

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* ══ SIDEBAR ══════════════════════════════════════════════════════ */}
          <aside className="w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-20">
              {/* Header Sidebar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <FilterOutlined className="text-[#c5a880]" />
                  <span className="text-sm font-black uppercase tracking-wider text-slate-800">
                    Bộ lọc
                  </span>
                </div>
              </div>

              {/* Active filters bar */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b border-slate-100">
                  {selectedCategoryIds.map((id) => {
                    const cat = categories?.find((c) => c.id === id);
                    return (
                      <Tag
                        key={id}
                        closable
                        onClose={() =>
                          setSelectedCategoryIds((prev) => prev.filter((x) => x !== id))
                        }
                        className="!m-0 rounded-full text-[10px] font-bold bg-[#c5a880]/10 text-[#b8955a] border-[#c5a880]/20"
                      >
                        {cat?.name}
                      </Tag>
                    );
                  })}
                  {selectedBrandIds.map((id) => {
                    const b = brands?.find((c) => c.id === id);
                    return (
                      <Tag
                        key={id}
                        closable
                        onClose={() =>
                          setSelectedBrandIds((prev) => prev.filter((x) => x !== id))
                        }
                        className="!m-0 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border-blue-100"
                      >
                        {b?.name}
                      </Tag>
                    );
                  })}
                  {selectedTagIds.map((id) => {
                    const t = tags?.find((x) => x.id === id);
                    return (
                      <Tag
                        key={id}
                        closable
                        onClose={() =>
                          setSelectedTagIds((prev) => prev.filter((x) => x !== id))
                        }
                        className="!m-0 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border-green-100"
                      >
                        {t?.name}
                      </Tag>
                    );
                  })}
                </div>
              )}

              {/* ── Danh mục ── */}
              <div className="mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Danh mục</p>
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Tìm danh mục..."
                  value={selectedCategoryIds}
                  onChange={(vals) => setSelectedCategoryIds(vals)}
                  optionFilterProp="label"
                  maxTagCount="responsive"
                  style={selectStyle}
                  className={selectClass}
                  options={categories?.map((c) => ({ label: c.name, value: c.id! })) || []}
                />
              </div>

              {/* ── Thương hiệu ── */}
              {brands && brands.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Thương hiệu</p>
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    placeholder="Tìm thương hiệu..."
                    value={selectedBrandIds}
                    onChange={(vals) => setSelectedBrandIds(vals)}
                    optionFilterProp="label"
                    maxTagCount="responsive"
                    style={selectStyle}
                    className={selectClass}
                    options={brands.map((b) => ({ label: b.name, value: b.id! }))}
                  />
                </div>
              )}

              {/* ── Kiểu dáng (Tags) ── */}
              {tags && tags.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Kiểu dáng</p>
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    placeholder="Tìm kiểu dáng..."
                    value={selectedTagIds}
                    onChange={(vals) => setSelectedTagIds(vals)}
                    optionFilterProp="label"
                    maxTagCount="responsive"
                    style={selectStyle}
                    className={selectClass}
                    options={tags.map((t) => ({ label: t.name, value: t.id! }))}
                  />
                </div>
              )}

              {/* ── Khoảng giá ── */}
              <div className="mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Khoảng giá</p>
                <Select
                  value={priceRangeIdx}
                  onChange={(val) => setPriceRangeIdx(val)}
                  style={selectStyle}
                  className={selectClass}
                  options={PRICE_RANGES.map((r, idx) => ({ label: r.label, value: idx }))}
                />
              </div>

              {/* ── Sắp xếp ── */}
              <div className="mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Sắp xếp</p>
                <Select
                  value={sortParam}
                  onChange={(val) => setSortParam(val)}
                  style={selectStyle}
                  className={selectClass}
                  options={SORT_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
                />
              </div>

              {/* ── Đang giảm giá ── */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mb-6">
                <span className="text-sm font-semibold text-slate-600">Đang giảm giá</span>
                <Switch
                  size="small"
                  checked={onSaleParam}
                  onChange={(v) => setOnSaleParam(v)}
                  style={{ backgroundColor: onSaleParam ? '#c5a880' : undefined }}
                />
              </div>

              {/* ── Nút Xóa bộ lọc ── */}
              <Button
                type="primary"
                onClick={clearAll}
                disabled={!hasActiveFilters}
                className="w-full bg-[#000] hover:!bg-[#c5a880] border-none font-bold uppercase text-xs tracking-wider h-10 rounded-xl transition-colors shadow-none"
              >
                Xóa tất cả bộ lọc
              </Button>
            </div>
          </aside>

          {/* ══ MAIN CONTENT ═════════════════════════════════════════════════ */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-slate-500">
                <span className="font-black text-slate-800 text-base">
                  {enrichedProducts.length}
                </span>{' '}
                sản phẩm
              </p>
              <div className="flex items-center gap-3">
                {/* View mode */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#c5a880] text-white' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <AppstoreOutlined />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#c5a880] text-white' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <UnorderedListOutlined />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {isLoadingProducts ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : enrichedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                <Empty description={<span className="text-slate-400 font-medium">Không tìm thấy sản phẩm nào</span>} />
                <Button
                  onClick={clearAll}
                  className="mt-6 rounded-full px-8 border-[#c5a880] text-[#c5a880] font-bold hover:bg-[#c5a880] hover:text-white transition-all"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {enrichedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/shop/${product.id}`)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col relative"
                  >
                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                      {product.isNew && (
                        <Tag className="!m-0 !rounded-full !border-none font-bold uppercase text-[9px] px-1.5 shadow-sm !bg-[#c5a880] !text-white">
                          Mới
                        </Tag>
                      )}
                      {product.hasDiscount && (
                        <Tag className="!m-0 !rounded-full !border-none font-bold uppercase text-[9px] px-1.5 shadow-sm !bg-red-500 !text-white">
                          Sale
                        </Tag>
                      )}
                      {(product.soldQuantity || 0) > 100 && (
                        <Tag className="!m-0 !rounded-full !border-none font-bold uppercase text-[9px] px-1.5 shadow-sm !bg-amber-400 !text-white flex items-center gap-0.5">
                          <FireFilled /> Hot
                        </Tag>
                      )}
                    </div>

                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://placehold.co/400x500/f5f5f5/c5a880?text=No+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white text-slate-900 px-5 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black hover:text-white transition-colors">
                          Xem chi tiết
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col flex-grow">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                        {product.categoryName}
                      </p>
                      <p className="text-sm font-bold line-clamp-2 text-slate-800 group-hover:text-[#c5a880] transition-colors leading-snug mb-2">
                        {product.name}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-black text-base text-slate-900">
                          {product.price > 0 ? formatPrice(product.price) : 'Liên hệ'}
                        </span>
                        <div className="flex items-center gap-0.5 text-[10px] text-gray-400">
                          <StarFilled className="text-yellow-400 text-xs" />
                          <span>5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-3">
                {enrichedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/shop/${product.id}`)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-100 flex gap-4 p-3"
                  >
                    <div className="w-24 h-28 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://placehold.co/400x500/f5f5f5/c5a880?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                        {product.categoryName}
                      </p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-[#c5a880] transition-colors truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {product.isNew && (
                          <span className="text-[9px] font-bold bg-[#c5a880]/10 text-[#b8955a] px-2 py-0.5 rounded-full uppercase">
                            Mới
                          </span>
                        )}
                        {product.hasDiscount && (
                          <span className="text-[9px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded-full uppercase">
                            Sale
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <span className="font-black text-base text-slate-900">
                        {product.price > 0 ? formatPrice(product.price) : 'Liên hệ'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
