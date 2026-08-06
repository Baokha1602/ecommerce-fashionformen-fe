import React, { useEffect, useState } from 'react';
import { Button, Steps } from 'antd';
import {
  CheckCircleFilled,
  ShoppingOutlined,
  ClockCircleOutlined,
  CarOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { orderApi } from '../api/order-api';
import type { OrderResponse } from '@/api-generated/api';

const fmt = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

const STATUS_STEPS = ['PENDING', 'PROCESSING', 'DELIVERING', 'DELIVERED'];
const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Chờ xác nhận',
  PROCESSING: 'Đang xử lý',
  DELIVERING: 'Đang giao hàng',
  DELIVERED: 'Đã giao thành công',
  CANCELLED: 'Đã hủy',
};

const PAYMENT_LABEL: Record<string, string> = {
  COD: 'Thanh toán khi nhận hàng (COD)',
  VN_PAY: 'Thanh toán qua VNPay',
  MOMO: 'Thanh toán qua Ví MoMo',
};

export const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId =
    parseInt(params.get('orderId') || '0') ||
    (location.state as any)?.orderId;

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (orderId) {
      orderApi.getOrderDetails(orderId).then((d) => setOrder(d || null)).catch(() => {});
    }
  }, [orderId]);

  const currentStep = order?.orderStatus
    ? Math.max(0, STATUS_STEPS.indexOf(order.orderStatus))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/40 flex items-start justify-center pt-12 pb-20 px-4">
      <div
        className="w-full max-w-xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* ── Card ── */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-gray-100 overflow-hidden">

          {/* Header gradient */}
          <div className="bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#c5a880] px-8 pt-10 pb-12 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[#c5a880]/20" />

            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1)' : 'scale(0.3)',
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s',
              }}
            >
              <CheckCircleFilled className="text-[#c5a880] text-7xl mb-5 block drop-shadow-lg" />
            </div>

            <h1 className="text-white text-2xl font-black uppercase tracking-widest mb-2">
              Đặt Hàng Thành Công!
            </h1>
            <p className="text-white/60 text-sm font-medium">
              Cảm ơn bạn đã tin tưởng <span className="text-[#c5a880] font-bold">Fashion For Men</span>
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">

            {/* Order ID pill */}
            {orderId && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Mã đơn hàng</span>
                <span className="font-black text-xl text-slate-900 font-mono tracking-wider">
                  #{orderId}
                </span>
              </div>
            )}

            {/* Status tracker */}
            <div className="mb-6">
              <Steps
                current={currentStep}
                size="small"
                items={[
                  { title: 'Đặt hàng', icon: <ClockCircleOutlined /> },
                  { title: 'Xử lý', icon: <ShoppingOutlined /> },
                  { title: 'Giao hàng', icon: <CarOutlined /> },
                  { title: 'Hoàn tất', icon: <SmileOutlined /> },
                ]}
                style={{ '--ant-color-primary': '#c5a880' } as React.CSSProperties}
              />
            </div>

            {/* Order details */}
            {order && (
              <div className="space-y-3 mb-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-500 font-medium">Trạng thái</span>
                  <span className="font-bold text-slate-800 bg-[#c5a880]/10 text-[#b8955a] px-3 py-0.5 rounded-full text-xs">
                    {STATUS_LABEL[order.orderStatus || ''] || order.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-slate-500 font-medium">Thanh toán</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[200px]">
                    {PAYMENT_LABEL[order.paymentMethod || ''] || order.paymentMethod}
                  </span>
                </div>
                {(order.shippingFeeActual !== undefined || order.shippingFeeOriginal !== undefined) && (
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-500 font-medium">Phí vận chuyển (GHN)</span>
                    <span className="font-semibold text-slate-800">
                      {fmt(order.shippingFeeActual ?? order.shippingFeeOriginal ?? 0)}
                    </span>
                  </div>
                )}
                {order.couponCode && (
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-500 font-medium">Mã giảm giá</span>
                    <span className="font-mono text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded">
                      {order.couponCode}
                    </span>
                  </div>
                )}
                <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Tổng thanh toán</span>
                  <span className="font-black text-2xl text-[#c5a880]">
                    {fmt(order.finalAmount ?? 0)}
                  </span>
                </div>
              </div>
            )}

            {/* Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-7 text-sm text-slate-600 leading-relaxed">
              📦 Chúng tôi sẽ xác nhận và xử lý đơn hàng trong vòng{' '}
              <span className="font-bold text-slate-800">24 giờ làm việc</span>.
              Bạn có thể theo dõi trạng thái tại mục{' '}
              <button
                onClick={() => navigate('/account/orders')}
                className="text-[#c5a880] font-bold underline underline-offset-2 cursor-pointer"
              >
                Lịch sử đơn hàng
              </button>
              .
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate('/account/orders')}
                className="h-12 rounded-2xl font-bold uppercase tracking-widest text-xs border-none"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
                }}
              >
                Xem Lịch Sử Đơn Hàng
              </Button>
              <Button
                size="large"
                block
                icon={<ShoppingOutlined />}
                onClick={() => navigate('/shop')}
                className="h-12 rounded-2xl font-bold uppercase tracking-widest text-xs border-2 border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-white hover:border-[#c5a880] transition-all"
              >
                Tiếp Tục Mua Sắm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
