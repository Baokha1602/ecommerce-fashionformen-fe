import React, { useEffect } from 'react';
import { Table, Typography, message, Tag, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchOrderHistoryThunk, cancelOrderThunk, clearError } from '../store/order-slice';

const { Title, Text } = Typography;

export const OrderHistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { historyList, loading, submitting, error, totalPages } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderHistoryThunk({ page: 0, size: 20 })); // load first page
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleCancelOrder = (orderId: number) => {
    dispatch(cancelOrderThunk(orderId));
  };

  const getStatusTag = (status?: string) => {
    switch (status) {
      case 'PENDING':
        return <Tag color="warning">Chờ xử lý</Tag>;
      case 'PROCESSING':
        return <Tag color="processing">Đang xử lý</Tag>;
      case 'SHIPPED':
        return <Tag color="success">Đã giao hàng</Tag>;
      case 'CANCELLED':
        return <Tag color="error">Đã hủy</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text: number) => <Text strong>#{text}</Text>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => text ? new Date(text).toLocaleDateString('vi-VN') : '',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'finalAmount',
      key: 'finalAmount',
      render: (amount: number) => <Text strong type="danger">{amount?.toLocaleString('vi-VN')} đ</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Button 
          danger 
          size="small" 
          disabled={record.orderStatus === 'CANCELLED' || record.orderStatus === 'SHIPPED' || submitting}
          onClick={() => handleCancelOrder(record.id)}
        >
          Hủy đơn
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px 0', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2}>Lịch sử mua hàng</Title>
      <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <Table
          dataSource={historyList}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={totalPages > 1 ? { total: totalPages * 20, pageSize: 20 } : false}
          rowClassName="hover:bg-[#fafafa] transition-colors"
        />
      </div>
    </div>
  );
};
