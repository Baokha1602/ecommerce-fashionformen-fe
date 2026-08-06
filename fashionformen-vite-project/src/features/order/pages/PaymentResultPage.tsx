import React, { useEffect } from 'react';
import { Result, Button, Spin, Typography } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { verifyVnPayReturnThunk } from '../store/order-slice';

export const PaymentResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { submitting, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    if (Object.keys(params).length > 0) {
      dispatch(verifyVnPayReturnThunk(params));
    }
  }, [dispatch, searchParams]);

  if (submitting) {
    return (
      <div style={{ padding: '50px 0', textAlign: 'center' }}>
        <Spin size="large" />
        <Typography.Title level={4} style={{ marginTop: 16 }}>Đang xác minh thanh toán...</Typography.Title>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px 0', maxWidth: 800, margin: '0 auto' }}>
      {error ? (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle={error}
          extra={[
            <Button type="primary" key="console" onClick={() => navigate('/orders')}>
              Xem đơn hàng
            </Button>,
            <Button key="buy" onClick={() => navigate('/cart')}>Trở về giỏ hàng</Button>,
          ]}
        />
      ) : (
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle="Cảm ơn bạn đã mua sắm tại cửa hàng. Đơn hàng của bạn đang được xử lý."
          extra={[
            <Button type="primary" key="console" onClick={() => navigate('/orders')}>
              Theo dõi đơn hàng
            </Button>,
            <Button key="buy" onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>,
          ]}
        />
      )}
    </div>
  );
};
