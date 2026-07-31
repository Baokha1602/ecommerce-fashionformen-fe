import React, { useEffect, useState } from 'react';
import { Table, Button, App, Typography, Space, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllCouponThunk, createCouponThunk, updateCouponThunk, deleteCouponThunk } from '../store/coupon-thunk';
import { clearError } from '../store/coupon-slice';
import { CouponFormModal } from '../components/CouponFormModal';
import type { CouponResponse, CouponCreateRequest, CouponUpdateRequest } from '../types/coupon-type';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const StatusBadge: React.FC<{ isActive?: boolean }> = ({ isActive }) => {
  const color = isActive ? '#52c41a' : '#f5222d';
  const label = isActive ? 'Hoạt động' : 'Đã tắt';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 12px',
        borderRadius: 20,
        background: `${color}18`,
        border: `1.5px solid ${color}`,
        color: color,
        fontWeight: 700,
        fontSize: 12,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
};

export const CouponPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.coupon);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CouponResponse | null>(null);

  useEffect(() => {
    dispatch(fetchAllCouponThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: CouponResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: any) => {
    if (editing?.id != null) {
      const result = await dispatch(updateCouponThunk({ id: editing.id, body: values as CouponUpdateRequest }));
      if (updateCouponThunk.fulfilled.match(result)) {
        message.success('Cập nhật mã giảm giá thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createCouponThunk(values as CouponCreateRequest));
      if (createCouponThunk.fulfilled.match(result)) {
        message.success('Tạo mã giảm giá thành công!');
        handleCloseModal();
      }
    }
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa mã giảm giá này không?',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteCouponThunk(id));
        if (deleteCouponThunk.fulfilled.match(result)) {
          message.success('Xóa mã giảm giá thành công!');
        }
      },
    });
  };

  const columns: ColumnsType<CouponResponse> = [
    {
      title: 'Mã',
      dataIndex: 'code',
      render: (v: string) => <Text strong>{v}</Text>,
    },
    {
      title: 'Tên Coupon',
      dataIndex: 'name',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discountRate',
      align: 'center',
      render: (v: number) => (
        <Badge
          count={`${v}%`}
          style={{
            backgroundColor: '#f6ffed',
            color: '#52c41a',
            border: `1px solid #b7eb8f`,
          }}
        />
      ),
    },
    {
      title: 'Đơn tối thiểu',
      dataIndex: 'minOrderValue',
      align: 'right',
      render: (v: number) => <Text>{v?.toLocaleString('vi-VN')} đ</Text>,
    },
    {
      title: 'Hạn dùng',
      dataIndex: 'endDate',
      render: (v: string) => v ? dayjs(v).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      align: 'center',
      render: (v: boolean) => <StatusBadge isActive={v} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleOpenEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id!)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={4} style={{ margin: 0 }}>Quản lý Mã Giảm Giá</Title>
          <Text type="secondary">Thêm, sửa, xóa mã giảm giá cho cửa hàng</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenCreate}
          style={{
            background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
            border: 'none',
            color: '#fff',
            boxShadow: '0 2px 4px rgba(212, 175, 55, 0.3)',
          }}
        >
          Thêm Coupon
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={list.length > 10 ? { pageSize: 10 } : false}
        rowClassName="hover:bg-[#fafafa] transition-colors"
        style={{
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          borderRadius: 12,
        }}
      />

      <CouponFormModal
        open={modalOpen}
        editing={editing}
        loading={submitting}
        onCancel={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
