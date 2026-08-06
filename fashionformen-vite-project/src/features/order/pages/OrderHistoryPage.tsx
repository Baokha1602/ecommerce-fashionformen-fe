import React, { useEffect, useState } from 'react';
import { Button, Empty, Spin, Tag, Modal, Steps } from 'antd';
import {
  ShoppingOutlined,
  ClockCircleOutlined,
  CarOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchOrderHistoryThunk, cancelOrderThunk, clearError } from '../store/order-slice';
import { useNavigate } from 'react-router-dom';

const fmt = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  PENDING:    { label: 'Chờ xác nhận',   color: '#f59e0b', bg: '#fef3c7', icon: <ClockCircleOutlined /> },
  PROCESSING: { label: 'Đang xử lý',     color: '#3b82f6', bg: '#dbeafe', icon: <ShoppingOutlined /> },
  DELIVERING: { label: 'Đang giao hàng', color: '#8b5cf6', bg: '#ede9fe', icon: <CarOutlined /> },
  DELIVERED:  { label: 'Đã giao',        color: '#10b981', bg: '#d1fae5', icon: <CheckCircleOutlined /> },
  CANCELLED:  { label: 'Đã hủy',         color: '#ef4444', bg: '#fee2e2', icon: <CloseCircleOutlined /> },
};

const STATUS_STEPS = ['PENDING', 'PROCESSING', 'DELIVERING', 'DELIVERED'];

const PAYMENT_LABEL: Record<string, string> = {
  COD: 'COD',
  VN_PAY: 'VNPay',
  MOMO: 'MoMo',
};

export const OrderHistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { historyList, loading, submitting, error } = useAppSelector((s) => s.order);
  const [detailOrder, setDetailOrder] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchOrderHistoryThunk({ page: 0, size: 50 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  const handleCancel = (orderId: number) => {
    Modal.confirm({
      title: 'Hủy đơn hàng?',
      content: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
      okText: 'Hủy đơn',
      okButtonProps: { danger: true },
      cancelText: 'Giữ lại',
      onOk: () => dispatch(cancelOrderThunk(orderId)),
    });
  };

  const getStep = (status?: string) => {
    if (!status || status === 'CANCELLED') return -1;
    return Math.max(0, STATUS_STEPS.indexOf(status));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Lịch Sử Đơn Hàng</h1>
          <p className="text-sm text-slate-400 mt-1">{historyList.length} đơn hàng</p>
        </div>

        {historyList.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
            <Empty description={<span className="text-slate-400 font-medium">Bạn chưa có đơn hàng nào</span>} />
            <Button
              type="primary"
              size="large"
              className="mt-6 rounded-full px-10 font-bold uppercase tracking-wider text-xs border-none"
              style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)' }}
              onClick={() => navigate('/shop')}
            >
              Mua Sắm Ngay
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {historyList.map((order: any) => {
              const status = order.orderStatus || 'PENDING';
              const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
              const step = getStep(status);
              const isCancelled = status === 'CANCELLED';
              const canCancel = status === 'PENDING';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-lg text-slate-900 font-mono">#{order.id}</span>
                      <Tag
                        className="!m-0 !rounded-full !px-3 !py-0.5 !font-bold !text-xs !border-none"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.icon} <span className="ml-1">{cfg.label}</span>
                      </Tag>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : ''}
                    </span>
                  </div>

                  {/* Progress steps */}
                  {!isCancelled && (
                    <div className="px-6 py-4 border-b border-slate-50">
                      <Steps
                        current={step}
                        size="small"
                        items={[
                          { title: 'Đặt hàng', icon: <ClockCircleOutlined /> },
                          { title: 'Xử lý',    icon: <ShoppingOutlined /> },
                          { title: 'Giao hàng',icon: <CarOutlined /> },
                          { title: 'Hoàn tất', icon: <SmileOutlined /> },
                        ]}
                        style={{ '--ant-color-primary': '#c5a880' } as React.CSSProperties}
                      />
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between px-6 py-4">
                    <div>
                      <div className="text-xs text-slate-400 font-medium mb-0.5">Tổng tiền</div>
                      <div className="font-black text-xl text-[#c5a880]">{fmt(order.finalAmount ?? 0)}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {PAYMENT_LABEL[order.paymentMethod] || order.paymentMethod}
                        {order.isPaid && <span className="ml-2 text-green-600 font-bold">• Đã thanh toán</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="small"
                        icon={<EyeOutlined />}
                        className="rounded-full border-slate-200 text-slate-600 text-xs font-semibold"
                        onClick={() => setDetailOrder(order)}
                      >
                        Chi tiết
                      </Button>
                      {canCancel && (
                        <Button
                          size="small"
                          danger
                          loading={submitting}
                          className="rounded-full text-xs font-semibold"
                          onClick={() => handleCancel(order.id)}
                        >
                          Hủy đơn
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      <Modal
        open={!!detailOrder}
        onCancel={() => setDetailOrder(null)}
        footer={null}
        title={<span className="font-black text-lg">Chi tiết đơn #{detailOrder?.id}</span>}
        width={560}
      >
        {detailOrder && (
          <div className="space-y-4 pt-2">
            {detailOrder.statusHistory?.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Lịch sử trạng thái</p>
                <div className="space-y-2">
                  {detailOrder.statusHistory.map((h: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: STATUS_CONFIG[h.status]?.color || '#888' }} />
                      <span className="font-semibold text-slate-700">{STATUS_CONFIG[h.status]?.label || h.status}</span>
                      <span className="text-slate-400 text-xs ml-auto">
                        {h.changedAt ? new Date(h.changedAt).toLocaleString('vi-VN') : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {detailOrder.orderItems?.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sản phẩm</p>
                <div className="space-y-2">
                  {detailOrder.orderItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm bg-slate-50 rounded-xl px-4 py-2">
                      <span className="text-slate-700 font-medium">Variant #{item.productVariantId}</span>
                      <span className="text-slate-500">{item.quantity} × {fmt(item.price ?? 0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="border-t pt-3 space-y-1.5 text-sm">
              {detailOrder.shippingFeeActual !== undefined && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Phí vận chuyển (GHN)</span>
                  <span className="font-semibold">{fmt(detailOrder.shippingFeeActual)}</span>
                </div>
              )}
              {(detailOrder.couponDiscountAmount ?? 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Giảm giá voucher</span>
                  <span className="font-semibold text-green-600">-{fmt(detailOrder.couponDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-1 border-t">
                <span>Tổng thanh toán</span>
                <span className="text-[#c5a880] text-lg">{fmt(detailOrder.finalAmount ?? 0)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
