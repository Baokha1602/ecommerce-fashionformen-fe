import React, { useEffect, useState } from 'react';
import { Table, Typography, Select, Space, Button, Tooltip } from 'antd';
import { ShoppingOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllAdminOrdersThunk, updateOrderStatusThunk } from '../store/admin-orders-thunk';
import { clearError } from '../store/admin-orders-slice';
import { ORDER_STATUS_MAP, PAYMENT_METHOD_MAP } from '../constants/admin-orders-constants';
import { GetAllOrdersOrderStatusEnum, OrderStatusUpdateRequestNewStatusEnum } from '../types/admin-orders-type';

const { Title, Text } = Typography;

export const AdminOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error, totalElements } = useAppSelector((state) => state.adminOrders);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState<GetAllOrdersOrderStatusEnum | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchAllAdminOrdersThunk({
      pageable: { page: currentPage - 1, size: pageSize },
      orderStatus: filterStatus
    }));
  }, [dispatch, currentPage, pageSize, filterStatus]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleStatusChange = (orderId: number, newStatus: OrderStatusUpdateRequestNewStatusEnum) => {
    dispatch(updateOrderStatusThunk({ orderId, body: { newStatus } }));
  };

  // Render badge trạng thái đơn hàng
  const renderStatusTag = (status: GetAllOrdersOrderStatusEnum) => {
    const config = ORDER_STATUS_MAP[status] || { label: status, color: '#888' };
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '3px 12px', borderRadius: 20,
        background: `${config.color}18`,
        border: `1.5px solid ${config.color}`,
        color: config.color,
        fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap'
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: config.color, flexShrink: 0 }} />
        {config.label}
      </span>
    );
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      render: (text: number) => <Text strong className="font-mono text-xs">#{text}</Text>,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_: any, record: any) => (
        <div>
          <Text strong className="block">{record.firstName} {record.lastName}</Text>
          <Text type="secondary" className="block text-xs">{record.phoneNumber}</Text>
        </div>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => text ? <Text type="secondary" className="text-xs">{new Date(text).toLocaleString('vi-VN')}</Text> : '—',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'finalAmount',
      key: 'finalAmount',
      render: (amount: number) => <Text strong style={{ color: '#c5a880' }}>{amount?.toLocaleString('vi-VN')} đ</Text>,
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method: any) => {
        const config = PAYMENT_METHOD_MAP[method as keyof typeof PAYMENT_METHOD_MAP];
        return <Text>{config?.label || method}</Text>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: any) => renderStatusTag(status),
    },
    {
      title: 'Cập nhật',
      key: 'action',
      align: 'center' as const,
      width: 150,
      render: (_: any, record: any) => (
        <Select
          value={record.orderStatus}
          disabled={submitting}
          style={{ width: 130 }}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={Object.keys(ORDER_STATUS_MAP).map(key => ({
            value: key,
            label: ORDER_STATUS_MAP[key as GetAllOrdersOrderStatusEnum].label
          }))}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Header đồng nhất với BrandsPage */}
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
              {totalElements > 0 ? `${totalElements} đơn hàng trong hệ thống` : 'Quản lý và cập nhật trạng thái đơn hàng'}
            </Text>
          </div>
        </div>

        <Space>
          {/* Lọc theo trạng thái */}
          <Select
            placeholder="Lọc trạng thái"
            allowClear
            style={{ width: 160 }}
            value={filterStatus}
            onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
            options={Object.keys(ORDER_STATUS_MAP).map(key => ({
              value: key,
              label: ORDER_STATUS_MAP[key as GetAllOrdersOrderStatusEnum].label
            }))}
          />
          <Tooltip title="Làm mới">
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={() => dispatch(fetchAllAdminOrdersThunk({
                pageable: { page: currentPage - 1, size: pageSize },
                orderStatus: filterStatus
              }))}
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
        rowClassName="hover:bg-[#fafafa] transition-colors"
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        pagination={totalElements > 10 ? {
          current: currentPage,
          pageSize: pageSize,
          total: totalElements,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} đơn`,
          position: ['bottomRight'],
          onChange: (page, size) => { setCurrentPage(page); setPageSize(size); }
        } : false}
      />
    </div>
  );
};
