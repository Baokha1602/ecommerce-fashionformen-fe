import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Typography, message, Popconfirm, Image, Checkbox, Space, Tag } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ShopOutlined, TagOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';
import { useProductVariantList } from '@/features/catalog/hooks/useProductVariant';
import { CouponControllerApi } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { clearError } from '../store/cart-slice';
import { 
  fetchCartDetailsThunk, 
  updateCartItemThunk, 
  removeCartItemThunk, 
  applyCouponThunk,
  removeCouponThunk
} from '../store/cart-thunk';
import { useNavigate, useLocation } from 'react-router-dom';
import type { TableRowSelection } from 'antd/es/table/interface';

const { Title, Text } = Typography;

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartDetails, loading, error, submitting } = useAppSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const { data: allVariants } = useProductVariantList();
  
  // State for row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(location.state?.selectedCartItemIds || []);
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponApi = new CouponControllerApi(undefined, axiosClient.defaults.baseURL, axiosClient as any);
        const res = await couponApi.getAvailableCoupons();
        setCoupons(res.data.data || []);
      } catch (error) {
        console.error('Lỗi lấy danh sách voucher:', error);
      }
    };
    fetchCoupons();
  }, []);

  useEffect(() => {
    dispatch(fetchCartDetailsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const items = cartDetails?.cartItems || [];

  // When items load or change, we might want to retain selection if the item still exists
  useEffect(() => {
    if (!cartDetails) return; // Wait until cart is loaded so we don't clear pre-selected keys from router state
    const existingIds = (cartDetails.cartItems || []).map(item => item.id);
    setSelectedRowKeys(prev => {
      const filtered = prev.filter(key => existingIds.includes(key as number));
      if (filtered.length === prev.length) {
        return prev;
      }
      return filtered;
    });
  }, [cartDetails]);

  const handleUpdateQuantity = (cartItemId: number, variantId: number, currentQuantity: number, increment: number) => {
    const newQuantity = currentQuantity + increment;
    if (newQuantity < 1) return;
    dispatch(updateCartItemThunk({ cartItemId, body: { productVariantId: variantId, quantity: newQuantity } }));
  };

  const handleRemoveItem = (cartItemId: number) => {
    dispatch(removeCartItemThunk(cartItemId));
  };

  const handleRemoveSelectedItems = () => {
    if (selectedRowKeys.length === 0) return;
    Promise.all(selectedRowKeys.map(key => dispatch(removeCartItemThunk(key as number))))
      .then(() => {
        setSelectedRowKeys([]);
        message.success('Đã xóa các sản phẩm được chọn');
      });
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      message.warning('Vui lòng nhập mã giảm giá');
      return;
    }
    dispatch(applyCouponThunk(couponCode));
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCouponThunk());
    setCouponCode('');
  };

  // Row selection configuration
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 48,
  };

  const columns = [
    {
      title: 'Sản Phẩm',
      key: 'product',
      width: '40%',
      render: (_: any, record: any) => {
        const currentVariant = allVariants?.find(v => v.id === record.productVariantId);
        const productName = currentVariant?.productName || record.productName || 'Tên sản phẩm';

        const extRecord = record as any;
        return (
        <div className="flex items-center gap-4">
          {extRecord.imageUrl || extRecord.productImageUrl ? (
            <Image src={extRecord.imageUrl || extRecord.productImageUrl} alt={productName} width={80} height={80} style={{ objectFit: 'cover', border: '1px solid #f0f0f0' }} />
          ) : (
            <div style={{ width: 80, height: 80, background: '#f5f5f5', border: '1px solid #f0f0f0' }} />
          )}
          <div className="flex flex-col">
            <Text style={{ fontWeight: 500, fontSize: 14, color: '#333' }} className="line-clamp-2">
              {productName}
            </Text>
            <Text type="secondary" style={{ fontSize: 13, marginTop: 4 }}>
              Phân loại hàng: {record.productVariantName || `${extRecord.colorName || ''} ${extRecord.sizeName ? '- ' + extRecord.sizeName : ''}`.trim() || 'Mặc định'}
            </Text>
          </div>
        </div>
        );
      },
    },
    {
      title: 'Đơn Giá',
      key: 'price',
      width: '15%',
      align: 'center' as const,
      render: (_: any, record: any) => {
        const originalPrice = record.price || 0;
        const finalPrice = (record.discountPrice && record.discountPrice > 0) ? record.discountPrice : originalPrice;
        return (
          <div className="flex flex-col items-center">
            {originalPrice > finalPrice && (
              <Text delete type="secondary" style={{ fontSize: 12 }}>{originalPrice.toLocaleString('vi-VN')} đ</Text>
            )}
            <Text style={{ fontSize: 14, color: '#333' }}>{finalPrice.toLocaleString('vi-VN')} đ</Text>
          </div>
        );
      },
    },
    {
      title: 'Số Lượng',
      key: 'quantity',
      width: '15%',
      align: 'center' as const,
      render: (_: any, record: any) => (
        <div className="flex items-center justify-center">
          <Button 
            size="small" 
            style={{ borderRadius: 0 }}
            icon={<MinusOutlined style={{ fontSize: 10 }} />} 
            onClick={() => handleUpdateQuantity(record.id, record.productVariantId, record.quantity, -1)}
            disabled={submitting || record.quantity <= 1}
          />
          <Input 
            value={record.quantity} 
            readOnly 
            style={{ width: 44, textAlign: 'center', borderRadius: 0, borderLeft: 0, borderRight: 0 }} 
            size="small"
          />
          <Button 
            size="small" 
            style={{ borderRadius: 0 }}
            icon={<PlusOutlined style={{ fontSize: 10 }} />} 
            onClick={() => handleUpdateQuantity(record.id, record.productVariantId, record.quantity, 1)}
            disabled={submitting}
          />
        </div>
      ),
    },
    {
      title: 'Số Tiền',
      key: 'totalPrice',
      width: '15%',
      align: 'center' as const,
      render: (_: any, record: any) => {
        const itemPrice = (record.discountPrice && record.discountPrice > 0) ? record.discountPrice : (record.price || 0);
        return (
          <Text style={{ color: '#ee4d2d', fontWeight: 500 }}>
            {(itemPrice * record.quantity)?.toLocaleString('vi-VN')} đ
          </Text>
        );
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '15%',
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={() => handleRemoveItem(record.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Text className="cursor-pointer hover:text-[#ee4d2d] transition-colors">Xóa</Text>
        </Popconfirm>
      ),
    },
  ];

  const getEffectivePrice = (item: any) => (item.discountPrice && item.discountPrice > 0) ? item.discountPrice : (item.price || 0);

  const selectedItems = items.filter(item => selectedRowKeys.includes(item.id as number));
  const selectedTotalOriginal = selectedItems.reduce((acc, item) => acc + getEffectivePrice(item) * (item.quantity || 0), 0);
  
  // Note: Backend cartDetails.finalAmount calculates discount for all items. 
  const isAllSelected = items.length > 0 && selectedRowKeys.length === items.length;
  
  const appliedCouponDiscount = cartDetails?.couponDiscount || 0;
  const appliedRankDiscount = appliedCouponDiscount > 0 ? 0 : (cartDetails?.rankDiscount || 0);
  const discountAmount = isAllSelected ? (appliedCouponDiscount + appliedRankDiscount) : 0;
  
  const finalTotalAmount = selectedTotalOriginal - discountAmount;

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-64px)] pb-32">
      <div className="max-w-6xl mx-auto pt-6 px-4">
        
        {/* Header Table / Bảng Tiêu đề */}
        <div className="bg-white rounded shadow-sm mb-4">
          <Table
            dataSource={items}
            columns={columns}
            rowKey="id"
            rowSelection={rowSelection}
            loading={loading}
            pagination={false}
            title={() => (
              <div className="flex items-center gap-2 px-2 pb-2">
                <ShopOutlined style={{ fontSize: 16 }} />
                <Text strong style={{ fontSize: 16 }}>Sản phẩm trong giỏ hàng</Text>
              </div>
            )}

            style={{
              '--ant-table-header-bg': '#fff',
              '--ant-table-header-color': '#888',
            } as React.CSSProperties}
          />
        </div>

        {/* Voucher Section */}
        <div className="bg-white rounded shadow-sm p-6 mb-4 flex flex-wrap items-center justify-between border-t border-dashed border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <TagOutlined style={{ color: '#ee4d2d', fontSize: 20 }} />
            <Text style={{ fontSize: 16 }}>Voucher</Text>
          </div>
          <div className="flex items-center gap-4">
            {cartDetails?.appliedCouponCode ? (
              <>
                <Tag color="success" style={{ padding: '4px 10px', fontSize: 14 }}>
                  Đã áp dụng: {cartDetails.appliedCouponCode}
                </Tag>
                <Button type="text" danger onClick={handleRemoveCoupon} loading={submitting}>Hủy bỏ</Button>
              </>
            ) : (
              <Space>
                <AutoComplete
                  placeholder="Chọn hoặc nhập mã giảm giá"
                  value={couponCode}
                  onChange={(val) => setCouponCode(val)}
                  style={{ width: 250 }}
                  disabled={submitting}
                  options={coupons.map((c: any) => {
                    const discountText = c.discountRate 
                      ? `${c.discountRate}%` + (c.maxDiscountAmount ? ` (Tối đa ${c.maxDiscountAmount.toLocaleString('vi-VN')}đ)` : '') 
                      : (c.maxDiscountAmount ? `${c.maxDiscountAmount.toLocaleString('vi-VN')}đ` : '');
                    return {
                      label: `${c.code} - Giảm ${discountText}`,
                      value: c.code
                    };
                  })}
                />
                <Button onClick={handleApplyCoupon} loading={submitting}>Áp dụng</Button>
              </Space>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
            <Checkbox 
              checked={isAllSelected && items.length > 0} 
              indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < items.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRowKeys(items.map(i => i.id as number));
                } else {
                  setSelectedRowKeys([]);
                }
              }}
            >
              Chọn Tất Cả ({items.length})
            </Checkbox>
            <Popconfirm
              title="Xóa tất cả các sản phẩm đã chọn?"
              onConfirm={handleRemoveSelectedItems}
              disabled={selectedRowKeys.length === 0}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Text 
                className={`cursor-pointer transition-colors ${selectedRowKeys.length > 0 ? 'hover:text-[#ee4d2d]' : 'text-gray-400'}`}
              >
                Xóa
              </Text>
            </Popconfirm>
          </div>
          
          <div className="flex items-center gap-6 w-full md:w-auto justify-end">
            <div className="flex flex-col items-end">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-4">
                  <Text style={{ fontSize: 16 }}>
                    Tổng thanh toán ({selectedRowKeys.length} Sản phẩm):
                  </Text>
                  <Text type="danger" style={{ fontSize: 24, fontWeight: 500 }}>
                    {finalTotalAmount.toLocaleString('vi-VN')} đ
                  </Text>
                </div>
                {appliedCouponDiscount > 0 && isAllSelected && (
                  <Text type="success" style={{ fontSize: 14 }}>
                    Đã giảm (Voucher): -{appliedCouponDiscount.toLocaleString('vi-VN')} đ
                  </Text>
                )}
                {appliedRankDiscount > 0 && isAllSelected && (
                  <Text type="success" style={{ fontSize: 14 }}>
                    Đã giảm (Hạng KH): -{appliedRankDiscount.toLocaleString('vi-VN')} đ
                  </Text>
                )}
              </div>
              {isAllSelected && discountAmount > 0 && (
                <Text style={{ fontSize: 14 }}>
                  Tiết kiệm: <span style={{ color: '#ee4d2d' }}>{discountAmount.toLocaleString('vi-VN')} đ</span>
                </Text>
              )}
            </div>
            
            <Button
              size="large"
              style={{ 
                background: '#ee4d2d', 
                color: 'white', 
                border: 'none', 
                width: 180, 
                height: 48, 
                fontSize: 16,
                borderRadius: 2
              }}
              disabled={selectedRowKeys.length === 0}
              onClick={() => navigate('/checkout', { state: { selectedCartItemIds: selectedRowKeys, appliedDiscount: discountAmount } })}
            >
              Mua Hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
