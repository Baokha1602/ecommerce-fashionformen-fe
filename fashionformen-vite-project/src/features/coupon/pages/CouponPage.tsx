import React, { useEffect, useState } from 'react';
import { Table, Button, App, Typography, Space, Badge, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, GiftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllCouponThunk, createCouponThunk, updateCouponThunk, deleteCouponThunk } from '../store/coupon-thunk';
import { clearError } from '../store/coupon-slice';
import { CouponFormModal } from '../components/CouponFormModal';
import type { CouponResponse, CouponCreateRequest, CouponUpdateRequest } from '../types/coupon-type';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// Badge trạng thái coupon
const StatusBadge: React.FC<{ isActive?: boolean }> = ({ isActive }) => {
  const color = isActive ? '#52c41a' : '#f5222d';
  const label = isActive ? 'Hoạt động' : 'Đã tắt';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 12px', borderRadius: 20,
      background: `${color}18`, border: `1.5px solid ${color}`,
      color: color, fontWeight: 700, fontSize: 12,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
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
    if (error) { message.error(error); dispatch(clearError()); }
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
      okText: 'Xóa', okButtonProps: { danger: true }, cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteCouponThunk(id));
        if (deleteCouponThunk.fulfilled.match(result)) message.success('Xóa mã giảm giá thành công!');
      },
    });
  };

  const columns: ColumnsType<CouponResponse> = [
    {
      title: 'Mã',
      dataIndex: 'code',
      render: (v: string) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 12px', borderRadius: 20,
          background: '#c5a88018', border: '1.5px solid #c5a880',
          color: '#c5a880', fontWeight: 700, fontSize: 12,
        }}>
          {v}
        </span>
      ),
    },
    {
      title: 'Tên Coupon',
      dataIndex: 'name',
      render: (v: string) => <Text strong>{v}</Text>,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discountRate',
      align: 'center',
      width: 100,
      render: (v: number) => (
        <Badge
          count={`${v}%`}
          style={{
            backgroundColor: '#f6ffed', color: '#52c41a',
            border: `1px solid #b7eb8f`, fontWeight: 700, fontSize: 12, padding: '0 8px',
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
      render: (v: string) => v ? <Text type="secondary" className="text-xs">{dayjs(v).format('DD/MM/YYYY HH:mm')}</Text> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      align: 'center',
      width: 120,
      render: (v: boolean) => <StatusBadge isActive={v} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleOpenEdit(record)} style={{ color: '#c5a880' }} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header đồng nhất với BrandsPage */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #c5a88025 0%, #d4af3725 100%)',
            border: '1.5px solid #c5a88040',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GiftOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Quản lý Mã Giảm Giá
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Thêm, sửa, xóa mã giảm giá cho cửa hàng
            </Text>
          </div>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenCreate}
          style={{
            background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
            border: 'none', borderRadius: 8, fontWeight: 600,
            boxShadow: '0 4px 12px rgba(197,168,128,0.35)', color: '#fff',
          }}
        >
          Thêm Coupon
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        size="middle"
        bordered={false}
        pagination={list.length > 10 ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] } : false}
        rowClassName="hover:bg-[#fafafa] transition-colors"
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
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
