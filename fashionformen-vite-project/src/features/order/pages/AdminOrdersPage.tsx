import React, { useEffect, useState } from 'react';
import { Table, Typography, message, Select, Space, Card, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllAdminOrdersThunk, updateOrderStatusThunk } from '../store/admin-orders-thunk';
import { clearError } from '../store/admin-orders-slice';
import { ORDER_STATUS_MAP, PAYMENT_METHOD_MAP } from '../constants/admin-orders-constants';
import { GetAllOrdersOrderStatusEnum, OrderStatusUpdateRequestNewStatusEnum } from '../types/admin-orders-type';

const { Title, Text } = Typography;

export const AdminOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error, totalPages, totalElements } = useAppSelector((state) => state.adminOrders);
  
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
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleStatusChange = (orderId: number, newStatus: OrderStatusUpdateRequestNewStatusEnum) => {
    dispatch(updateOrderStatusThunk({ orderId, body: { newStatus } }));
  };

  const renderStatusTag = (status: GetAllOrdersOrderStatusEnum) => {
    const config = ORDER_STATUS_MAP[status] || { label: status, color: '#888' };
    return (
      <span style={{
        padding: '3px 12px', borderRadius: 20,
        background: `${config.color}18`,
        border: `1.5px solid ${config.color}`,
        color: config.color,
        fontWeight: 700, fontSize: 12,
        whiteSpace: 'nowrap'
      }}>
        {config.label}
      </span>
    );
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      render: (text: number) => <Text strong>#{text}</Text>,
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
      render: (text: string) => text ? new Date(text).toLocaleString('vi-VN') : '',
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
      title: 'Cập nhật trạng thái',
      key: 'action',
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
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="!mb-0">Quản lý Đơn hàng</Title>
        <Space>
          <Select
            placeholder="Lọc theo trạng thái"
            allowClear
            style={{ width: 180 }}
            value={filterStatus}
            onChange={(val) => {
              setFilterStatus(val);
              setCurrentPage(1);
            }}
            options={Object.keys(ORDER_STATUS_MAP).map(key => ({
              value: key,
              label: ORDER_STATUS_MAP[key as GetAllOrdersOrderStatusEnum].label
            }))}
          />
          <Button 
            onClick={() => dispatch(fetchAllAdminOrdersThunk({ 
              pageable: { page: currentPage - 1, size: pageSize }, 
              orderStatus: filterStatus 
            }))}
            loading={loading}
          >
            Làm mới
          </Button>
        </Space>
      </div>

      <Card style={{ borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }} bodyStyle={{ padding: 0 }}>
        <Table
          dataSource={list}
          columns={columns}
          rowKey="id"
          loading={loading}
          rowClassName="hover:bg-[#fafafa] transition-colors"
          pagination={totalElements > 10 ? {
            current: currentPage,
            pageSize: pageSize,
            total: totalElements,
            showSizeChanger: true,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }
          } : false}
        />
      </Card>
    </div>
  );
};
