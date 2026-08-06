import React, { useEffect, useRef, useState } from 'react';
import { Table, Typography, Select, Space, Button, Tooltip, Modal, Badge, Descriptions } from 'antd';
import {
  ShoppingOutlined,
  ReloadOutlined,
  EyeOutlined,
  CarOutlined,
  CheckOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllAdminOrdersThunk, updateOrderStatusThunk } from '../store/admin-orders-thunk';
import { clearError } from '../store/admin-orders-slice';
import { ORDER_STATUS_MAP, PAYMENT_METHOD_MAP } from '../constants/admin-orders-constants';
import { GetAllOrdersOrderStatusEnum, OrderStatusUpdateRequestNewStatusEnum } from '../types/admin-orders-type';

const { Title, Text } = Typography;
const fmt = (n: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

// Next action each status can take
const NEXT_ACTION: Record<string, { newStatus: OrderStatusUpdateRequestNewStatusEnum; label: string; icon: React.ReactNode; color: string } | null> = {
  PENDING:    { newStatus: OrderStatusUpdateRequestNewStatusEnum.Processing, label: 'Xác nhận xử lý', icon: <SyncOutlined />,  color: '#1677ff' },
  PROCESSING: { newStatus: OrderStatusUpdateRequestNewStatusEnum.Delivering, label: 'Giao cho GHN',   icon: <CarOutlined />,   color: '#722ed1' },
  DELIVERING: { newStatus: OrderStatusUpdateRequestNewStatusEnum.Delivered,  label: 'Đã giao xong',  icon: <CheckOutlined />, color: '#52c41a' },
  DELIVERED:  null,
  CANCELLED:  null,
};

export const AdminOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error, totalElements } = useAppSelector((s) => s.adminOrders);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState<GetAllOrdersOrderStatusEnum | undefined>(undefined);
  const [detailOrder, setDetailOrder] = useState<any>(null);

  const loadOrders = () => {
    dispatch(fetchAllAdminOrdersThunk({
      pageable: { page: currentPage - 1, size: pageSize },
      orderStatus: filterStatus,
    }));
  };

  // Initial load + when filters/page change
  useEffect(() => { loadOrders(); }, [dispatch, currentPage, pageSize, filterStatus]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    intervalRef.current = setInterval(loadOrders, 30000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [currentPage, pageSize, filterStatus]);

  useEffect(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  const handleNextStatus = (orderId: number, newStatus: OrderStatusUpdateRequestNewStatusEnum) => {
    const isGHN = newStatus === OrderStatusUpdateRequestNewStatusEnum.Delivering;
    Modal.confirm({
      title: isGHN ? '📦 Giao đơn cho GHN?' : 'Cập nhật trạng thái?',
      content: isGHN
        ? 'Đơn hàng sẽ được chuyển trạng thái DELIVERING và backend sẽ tự động tạo đơn vận chuyển trên GHN.'
        : 'Xác nhận cập nhật trạng thái đơn hàng này?',
      okText: isGHN ? 'Xác nhận giao GHN' : 'Xác nhận',
      okButtonProps: { style: { background: isGHN ? '#722ed1' : '#1677ff', border: 'none' } },
      cancelText: 'Hủy',
      onOk: () => dispatch(updateOrderStatusThunk({ orderId, body: { newStatus } })).then(loadOrders),
    });
  };

  const handleCancelOrder = (orderId: number) => {
    Modal.confirm({
      title: 'Hủy đơn hàng?',
      content: 'Đơn hàng sẽ bị hủy và không thể hoàn tác.',
      okText: 'Hủy đơn',
      okButtonProps: { danger: true },
      cancelText: 'Giữ lại',
      onOk: () =>
        dispatch(updateOrderStatusThunk({ orderId, body: { newStatus: OrderStatusUpdateRequestNewStatusEnum.Cancelled } }))
          .then(loadOrders),
    });
  };

  // Status badge render
  const renderStatusBadge = (status: GetAllOrdersOrderStatusEnum) => {
    const cfg = ORDER_STATUS_MAP[status] || { label: status, color: '#888' };
    const isNew = status === 'PENDING';
    return (
      <Badge dot={isNew} color="red" offset={[4, 0]}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 12px', borderRadius: 20,
          background: `${cfg.color}18`, border: `1.5px solid ${cfg.color}`,
          color: cfg.color, fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
          {cfg.label}
          {isNew && <span style={{ fontSize: 9, fontWeight: 900, background: '#ff4d4f', color: '#fff', borderRadius: 4, padding: '0 4px', marginLeft: 2 }}>MỚI</span>}
          {status === 'DELIVERING' && <span style={{ fontSize: 9, fontWeight: 900, background: '#722ed1', color: '#fff', borderRadius: 4, padding: '0 4px', marginLeft: 2 }}>GHN</span>}
        </span>
      </Badge>
    );
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: number) => <Text strong className="font-mono text-xs">#{text}</Text>,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_: any, r: any) => (
        <div>
          <Text strong className="block">{r.firstName} {r.lastName}</Text>
          <Text type="secondary" className="block text-xs">{r.phoneNumber}</Text>
          <Text type="secondary" className="block text-xs">{r.email}</Text>
        </div>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (t: string) => t ? <Text type="secondary" className="text-xs">{new Date(t).toLocaleString('vi-VN')}</Text> : '—',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'finalAmount',
      key: 'finalAmount',
      render: (a: number) => <Text strong style={{ color: '#c5a880' }}>{fmt(a)}</Text>,
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (m: any) => {
        const cfg = PAYMENT_METHOD_MAP[m as keyof typeof PAYMENT_METHOD_MAP];
        return <Text style={{ fontSize: 12 }}>{cfg?.label || m}</Text>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (s: any) => renderStatusBadge(s),
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center' as const,
      width: 210,
      render: (_: any, record: any) => {
        const next = NEXT_ACTION[record.orderStatus];
        const canCancel = record.orderStatus === 'PENDING' || record.orderStatus === 'PROCESSING';
        return (
          <Space size={4} wrap>
            {/* View detail */}
            <Tooltip title="Xem chi tiết">
              <Button
                size="small"
                icon={<EyeOutlined />}
                className="rounded-full"
                onClick={() => setDetailOrder(record)}
              />
            </Tooltip>

            {/* Primary next-step action */}
            {next && (
              <Button
                size="small"
                disabled={submitting}
                icon={next.icon}
                style={{ background: next.color, borderColor: next.color, color: '#fff', borderRadius: 20, fontWeight: 700, fontSize: 11 }}
                onClick={() => handleNextStatus(record.id, next.newStatus)}
              >
                {next.label}
              </Button>
            )}

            {/* Cancel */}
            {canCancel && (
              <Button
                size="small"
                danger
                disabled={submitting}
                className="rounded-full text-xs"
                onClick={() => handleCancelOrder(record.id)}
              >
                Hủy
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #c5a88025 0%, #d4af3725 100%)',
            border: '1.5px solid #c5a88040',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShoppingOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Quản lý Đơn hàng
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {totalElements > 0 ? `${totalElements} đơn hàng` : 'Quản lý và cập nhật trạng thái đơn hàng'}
              <span style={{ marginLeft: 8, color: '#52c41a', fontSize: 10 }}>• Tự động làm mới sau 30 giây</span>
            </Text>
          </div>
        </div>

        <Space>
          <Select
            placeholder="Lọc trạng thái"
            allowClear
            style={{ width: 160 }}
            value={filterStatus}
            onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
            options={Object.keys(ORDER_STATUS_MAP).map((key) => ({
              value: key,
              label: ORDER_STATUS_MAP[key as GetAllOrdersOrderStatusEnum].label,
            }))}
          />
          <Tooltip title="Làm mới ngay">
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={loadOrders}
              style={{
                background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
                border: 'none', borderRadius: 8, fontWeight: 600,
                boxShadow: '0 4px 12px rgba(197,168,128,0.35)', color: '#fff',
              }}
            >
              Làm mới
            </Button>
          </Tooltip>
        </Space>
      </div>

      {/* Table */}
      <Table
        dataSource={list}
        columns={columns}
        rowKey="id"
        loading={loading}
        size="middle"
        bordered={false}
        rowClassName={(record) =>
          record.orderStatus === 'PENDING'
            ? 'bg-amber-50/40 hover:bg-amber-50 transition-colors'
            : 'hover:bg-[#fafafa] transition-colors'
        }
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        pagination={totalElements > 10 ? {
          current: currentPage,
          pageSize: pageSize,
          total: totalElements,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} đơn`,
          position: ['bottomRight'],
          onChange: (page, size) => { setCurrentPage(page); setPageSize(size); },
        } : false}
      />

      {/* ── Detail Modal ── */}
      <Modal
        open={!!detailOrder}
        onCancel={() => setDetailOrder(null)}
        footer={null}
        title={
          <div className="flex items-center gap-3">
            <span className="font-black text-lg">Chi tiết đơn #{detailOrder?.id}</span>
            {detailOrder && renderStatusBadge(detailOrder.orderStatus)}
          </div>
        }
        width={680}
      >
        {detailOrder && (
          <div className="space-y-5 pt-2">
            {/* Customer info */}
            <Descriptions size="small" column={2} bordered>
              <Descriptions.Item label="Họ tên">{detailOrder.firstName} {detailOrder.lastName}</Descriptions.Item>
              <Descriptions.Item label="SĐT">{detailOrder.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="Email">{detailOrder.email || '—'}</Descriptions.Item>
              <Descriptions.Item label="Thanh toán">
                {PAYMENT_METHOD_MAP[detailOrder.paymentMethod as keyof typeof PAYMENT_METHOD_MAP]?.label || detailOrder.paymentMethod}
              </Descriptions.Item>
              {detailOrder.notes && <Descriptions.Item label="Ghi chú" span={2}>{detailOrder.notes}</Descriptions.Item>}
            </Descriptions>

            {/* Status history */}
            {detailOrder.statusHistory?.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Lịch sử trạng thái</p>
                <div className="space-y-2">
                  {detailOrder.statusHistory.map((h: any, i: number) => {
                    const cfg = ORDER_STATUS_MAP[h.status as GetAllOrdersOrderStatusEnum];
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm bg-slate-50 rounded-xl px-4 py-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg?.color || '#888' }} />
                        <span className="font-semibold text-slate-700">{cfg?.label || h.status}</span>
                        <span className="text-slate-400 text-xs ml-auto">{h.changedAt ? new Date(h.changedAt).toLocaleString('vi-VN') : ''}</span>
                        {h.changedBy && <span className="text-xs text-slate-400 border-l pl-3 ml-2">{h.changedBy}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order items */}
            {detailOrder.orderItems?.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Sản phẩm đặt hàng</p>
                <div className="space-y-2">
                  {detailOrder.orderItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-3 text-sm">
                      <div>
                        <span className="font-semibold text-slate-800">Variant #{item.productVariantId}</span>
                        <span className="text-slate-400 ml-2 text-xs">× {item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#c5a880]">{fmt(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="border-t pt-4 space-y-2 text-sm">
              {detailOrder.shippingFeeActual !== undefined && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Phí vận chuyển GHN</span>
                  <span className="font-semibold">{fmt(detailOrder.shippingFeeActual)}</span>
                </div>
              )}
              {(detailOrder.couponDiscountAmount ?? 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Giảm giá ({detailOrder.couponCode})</span>
                  <span className="text-green-600 font-semibold">-{fmt(detailOrder.couponDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Tổng thanh toán</span>
                <span className="text-[#c5a880] text-lg">{fmt(detailOrder.finalAmount ?? 0)}</span>
              </div>
            </div>

            {/* Quick action in modal */}
            {(() => {
              const next = NEXT_ACTION[detailOrder.orderStatus];
              if (!next) return null;
              return (
                <Button
                  block
                  size="large"
                  icon={next.icon}
                  style={{ background: next.color, borderColor: next.color, color: '#fff', borderRadius: 12, fontWeight: 700 }}
                  onClick={() => {
                    setDetailOrder(null);
                    handleNextStatus(detailOrder.id, next.newStatus);
                  }}
                >
                  {next.label}
                </Button>
              );
            })()}
          </div>
        )}
      </Modal>
    </div>
  );
};
