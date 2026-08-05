import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, message, Card, Form, Input, Button, Radio, Image } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchCartDetailsThunk } from '@/features/cart/store/cart-thunk';
import { createOrderThunk, createMoMoUrlThunk, createVnPayUrlThunk, clearError } from '../store/order-slice';
import { fetchUserAddressesByUserIdThunk, createUserAddressThunk } from '@/features/user_address/store/user_address-thunk';
import { UserAddressFormModal } from '@/features/user_address/components/UserAddressFormModal';
import { useNavigate, useLocation } from 'react-router-dom';
import type { OrderCreateRequest } from '@/api-generated/api';
import type { UserAddressCreateRequest } from '@/features/user_address/types/user_address-type';
import { useProductVariantList } from '@/features/catalog/hooks/useProductVariant';
import { axiosClient } from '@/shared/lib/axios';

const { Title, Text } = Typography;

export const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCartItemIds = location.state?.selectedCartItemIds as number[] | undefined;
  const appliedDiscount = location.state?.appliedDiscount as number | undefined;
  const { cartDetails, loading: cartLoading } = useAppSelector((state) => state.cart);
  const { submitting, error, paymentUrl } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);
  const { data: allVariants } = useProductVariantList();
  const { list: addressList, loading: addressLoading } = useAppSelector((state) => state.userAddress);
  const [form] = Form.useForm();
  
  // Local state
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<OrderCreateRequest['paymentMethod']>('COD');
  const [shippingFee, setShippingFee] = useState<number>(0); 
  const [submittingAddress, setSubmittingAddress] = useState(false);
  const selectedAddressId = Form.useWatch('userAddressId', form);

  useEffect(() => {
    dispatch(fetchCartDetailsThunk());
    if (user?.id) {
      dispatch(fetchUserAddressesByUserIdThunk(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (addressList.length > 0 && !form.getFieldValue('userAddressId')) {
      const defaultAddress = addressList.find(addr => addr.isDefault) || addressList[0];
      form.setFieldsValue({ userAddressId: defaultAddress.id });
    }
  }, [addressList, form]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName || '',
        phoneNumber: user.phone || '', // Assuming phone exists, or leave blank if not
      });
    }
  }, [user, form]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl; // Redirect to VNPay/MoMo
    }
  }, [paymentUrl]);

  const handleAddressSubmit = async (values: any) => {
    if (!user?.id) return;
    setSubmittingAddress(true);
    const payload: UserAddressCreateRequest = {
      ...values,
      userId: user.id,
    };
    const action = await dispatch(createUserAddressThunk(payload));
    setSubmittingAddress(false);
    if (createUserAddressThunk.fulfilled.match(action)) {
      message.success('Thêm địa chỉ thành công');
      setAddressModalOpen(false);
      dispatch(fetchUserAddressesByUserIdThunk(user.id));
    } else {
      message.error(action.payload as string || 'Có lỗi xảy ra');
    }
  };

  const onFinish = async (values: any) => {
    if (!cartDetails || (cartDetails.cartItems?.length || 0) === 0) {
      message.warning('Giỏ hàng trống');
      return;
    }

    const nameParts = (values.fullName || '').trim().split(' ');
    const firstName = nameParts.length > 1 ? nameParts.pop() || '' : nameParts[0] || '';
    const lastName = nameParts.join(' ');

    if (!values.userAddressId) {
      message.warning('Vui lòng chọn địa chỉ giao hàng');
      return;
    }

    const orderReq: OrderCreateRequest = {
      userAddressId: values.userAddressId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: values.phoneNumber || '',
      paymentMethod: paymentMethod,
      notes: '',
      selectedCartItemIds: selectedCartItemIds || items.map(item => item.id as number),
    };

    const action = await dispatch(createOrderThunk(orderReq));
    if (createOrderThunk.fulfilled.match(action)) {
      const orderData: any = action.payload; // orderId is inside
      const orderId = orderData.orderId;

      if (paymentMethod === 'VN_PAY') {
        dispatch(createVnPayUrlThunk(orderId));
      } else if (paymentMethod === 'MOMO') {
        dispatch(createMoMoUrlThunk(orderId));
      } else {
        message.success('Đặt hàng thành công');
        navigate('/orders');
      }
    }
  };

  const allItems = cartDetails?.cartItems || [];
  const isAllSelected = selectedCartItemIds ? selectedCartItemIds.length === allItems.length : true;

  const items = selectedCartItemIds && selectedCartItemIds.length > 0
    ? allItems.filter(item => selectedCartItemIds.includes(item.id as number))
    : allItems;

  useEffect(() => {
    if (selectedAddressId && items.length > 0) {
      const fetchShippingFee = async () => {
        try {
          const totalQuantity = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
          const response = await axiosClient.get(`/api/orders/shipping-fee`, {
            params: { addressId: selectedAddressId, totalQuantity }
          });
          const fee = response.data?.data || 0;
          setShippingFee(fee);
        } catch (error) {
          console.error('Lỗi lấy phí vận chuyển:', error);
          setShippingFee(30000);
        }
      };
      fetchShippingFee();
    }
  }, [selectedAddressId, items]);

  const getEffectivePrice = (item: any) => (item.discountPrice && item.discountPrice > 0) ? item.discountPrice : (item.price || 0);

  const subtotal = items.reduce((acc, item) => acc + getEffectivePrice(item) * (item.quantity || 0), 0);
  
  const appliedCouponDiscount = cartDetails?.couponDiscount || 0;
  const appliedRankDiscount = appliedCouponDiscount > 0 ? 0 : (cartDetails?.rankDiscount || 0);
  
  // Use appliedDiscount from CartPage if available, otherwise fallback to basic logic
  const discountAmount = appliedDiscount !== undefined ? appliedDiscount : (isAllSelected 
    ? (appliedCouponDiscount + appliedRankDiscount) 
    : 0);
  
  const totalAmount = subtotal - discountAmount + shippingFee;

  return (
    <div style={{ padding: '24px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2}>Thanh toán</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card style={{ borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }} title="Thông tin giao hàng">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập SĐT' }]}>
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>
              <Title level={5} style={{ marginTop: 8 }}>Địa chỉ giao hàng</Title>
              {addressList.length === 0 && !addressLoading ? (
                <div style={{ marginBottom: 16 }}>
                  <Text type="secondary">Bạn chưa có địa chỉ giao hàng nào.</Text>
                  <Button type="link" onClick={() => setAddressModalOpen(true)}>
                    Thêm địa chỉ ngay
                  </Button>
                </div>
              ) : (
                <Form.Item name="userAddressId" rules={[{ required: true, message: 'Vui lòng chọn địa chỉ' }]}>
                  <Radio.Group style={{ width: '100%' }}>
                    <Row gutter={[16, 16]}>
                      {addressList.map(address => (
                        <Col span={24} key={address.id}>
                          <Radio value={address.id}>
                            <Text strong>{address.address}</Text>
                            {address.isDefault && <Text type="success" style={{ marginLeft: 8, fontSize: 12 }}>[Mặc định]</Text>}
                            <br />
                            <Text type="secondary" style={{ fontSize: 13 }}>
                              {address.wardName}, {address.districtName}, {address.provinceName}
                            </Text>
                          </Radio>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                </Form.Item>
              )}
              {addressList.length > 0 && (
                <Button type="link" onClick={() => setAddressModalOpen(true)} style={{ paddingLeft: 0 }}>
                  Thêm địa chỉ khác
                </Button>
              )}

              <Title level={5} style={{ marginTop: 24 }}>Phương thức thanh toán</Title>
              <Form.Item>
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
                    </Col>
                    <Col span={24}>
                      <Radio value="VN_PAY">Thanh toán qua VNPay</Radio>
                    </Col>
                    <Col span={24}>
                      <Radio value="MOMO">Thanh toán qua Ví MoMo</Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} lg={10}>
          <Card style={{ borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }} title="Đơn hàng của bạn">
            <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}>
              {items.map(item => {
                const itemPrice = (item.discountPrice && item.discountPrice > 0) ? item.discountPrice : (item.price || 0);
                const currentVariant = allVariants?.find(v => v.id === item.productVariantId);
                const productName = currentVariant?.productName || item.productVariantName || 'Tên sản phẩm';
                const extItem = item as any;
                const variantDetails = item.productVariantName || `${extItem.colorName || ''} ${extItem.sizeName ? '- ' + extItem.sizeName : ''}`.trim() || 'Mặc định';
                
                return (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {extItem.imageUrl || extItem.productImageUrl || (currentVariant as any)?.imageUrl ? (
                        <Image src={extItem.imageUrl || extItem.productImageUrl || (currentVariant as any)?.imageUrl} alt={productName} width={60} height={60} style={{ objectFit: 'cover', border: '1px solid #f0f0f0', borderRadius: 4 }} preview={false} />
                      ) : (
                        <div style={{ width: 60, height: 60, background: '#f5f5f5', border: '1px solid #f0f0f0', borderRadius: 4 }} />
                      )}
                      <div>
                        <Text strong className="line-clamp-2" style={{ maxWidth: 200, fontSize: 13 }}>{productName}</Text>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>Phân loại: {variantDetails}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>Số lượng: {item.quantity}</Text>
                      </div>
                    </div>
                    <Text strong>{(itemPrice * (item.quantity || 1)).toLocaleString('vi-VN')} đ</Text>
                  </div>
                );
              })}
            </div>
            
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text type="secondary">Phí vận chuyển:</Text>
                <Text>{shippingFee.toLocaleString('vi-VN')} đ</Text>
              </div>
              {appliedCouponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text type="secondary">Giảm giá (Voucher):</Text>
                  <Text type="success">- {appliedCouponDiscount.toLocaleString('vi-VN')} đ</Text>
                </div>
              )}
              {appliedRankDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text type="secondary">Giảm giá (Hạng KH):</Text>
                  <Text type="success">- {appliedRankDiscount.toLocaleString('vi-VN')} đ</Text>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <Title level={4} style={{ margin: 0 }}>Tổng cộng:</Title>
                <Title level={3} type="danger" style={{ margin: 0 }}>{totalAmount.toLocaleString('vi-VN')} đ</Title>
              </div>
            </div>
            
            <Button 
              type="primary" 
              block 
              size="large" 
              style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)', border: 'none', marginTop: 24 }}
              onClick={() => form.submit()}
              loading={submitting || cartLoading}
              disabled={items.length === 0}
            >
              Đặt hàng ngay
            </Button>
          </Card>
        </Col>
      </Row>

      <UserAddressFormModal
        open={addressModalOpen}
        editing={null}
        submitting={submittingAddress}
        onSubmit={handleAddressSubmit}
        onClose={() => setAddressModalOpen(false)}
      />
    </div>
  );
};
