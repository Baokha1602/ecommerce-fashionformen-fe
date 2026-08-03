import React, { useEffect, useState } from 'react';
import {
  Table, Button, App, Typography, Space, Avatar, Segmented, Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ShopOutlined,
  StopOutlined, UndoOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllBrandsThunk,
  createBrandThunk,
  updateBrandThunk,
  deleteBrandThunk,
} from '../store/brands-thunk';
import { clearError } from '../store/brands-slice';
import { BrandFormModal } from '../components/BrandFormModal';
import type { BrandResponse, BrandUpsertRequest } from '../types/brands-type';
import { ensureArray } from '@/shared/lib/ensure-array';

const { Title, Text } = Typography;

const BrandsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.brands);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BrandResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'TRASH'>('ALL');

  useEffect(() => {
    dispatch(fetchAllBrandsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: BrandResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: BrandUpsertRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateBrandThunk({ id: editing.id, body: values }));
      if (updateBrandThunk.fulfilled.match(result)) {
        message.success('Cập nhật thương hiệu thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createBrandThunk(values));
      if (createBrandThunk.fulfilled.match(result)) {
        message.success('Tạo thương hiệu thành công!');
        handleCloseModal();
      }
    }
  };

  // ── XÓA MỀM (Soft Delete / Vô hiệu hóa hoặc Khôi phục) ──
  const handleSoftDeleteToggle = async (record: BrandResponse) => {
    const newStatus = !(record.isActive ?? true);
    const actionText = newStatus ? 'Khôi phục' : 'Xóa mềm (Ẩn)';
    const result = await dispatch(updateBrandThunk({
      id: record.id!,
      body: {
        name: record.name || '',
        description: record.description,
        logoUrl: record.logoUrl,
        isActive: newStatus,
      }
    }));
    if (updateBrandThunk.fulfilled.match(result)) {
      message.success(`${actionText} thương hiệu "${record.name}" thành công!`);
    }
  };

  // ── XÓA CỨNG (Hard Delete / Xóa vĩnh viễn khỏi Database) ──
  const handleHardDelete = (record: BrandResponse) => {
    modal.confirm({
      title: '⚠️ CẢNH BÁO: Xóa vĩnh viễn (Xóa cứng)',
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: (
        <div>
          <p>Hành động này sẽ <strong>xóa hoàn toàn dữ liệu thương hiệu</strong> <span className="text-red-600 font-bold">"{record.name}"</span> khỏi hệ thống.</p>
          <p className="text-xs text-gray-500 mt-1">Không thể khôi phục lại dữ liệu sau khi xóa cứng!</p>
        </div>
      ),
      okText: 'Xóa vĩnh viễn',
      okButtonProps: { danger: true },
      cancelText: 'Hủy bỏ',
      onOk: async () => {
        const result = await dispatch(deleteBrandThunk(record.id!));
        if (deleteBrandThunk.fulfilled.match(result)) {
          message.success(`Đã xóa vĩnh viễn thương hiệu "${record.name}"!`);
        }
      },
    });
  };

  const brandList = ensureArray(list);
  const filteredBrands = brandList.filter((b) => {
    if (statusFilter === 'ACTIVE') return b.isActive !== false;
    if (statusFilter === 'TRASH') return b.isActive === false;
    return true;
  });

  const columns: ColumnsType<BrandResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      render: (v: number) => <Text type="secondary" className="text-xs font-mono">#{v}</Text>,
    },
    {
      title: 'Logo',
      dataIndex: 'logoUrl',
      width: 70,
      align: 'center',
      render: (url: string) => (
        url
          ? <Avatar src={url} size={36} shape="square" style={{ borderRadius: 8, border: '1px solid #f0f0f0' }} />
          : (
            <Avatar
              size={36}
              shape="square"
              style={{ borderRadius: 8, background: 'linear-gradient(135deg, #c5a88020 0%, #d4af3720 100%)', border: '1.5px solid #c5a88040' }}
            >
              <ShopOutlined style={{ color: '#c5a880', fontSize: 16 }} />
            </Avatar>
          )
      ),
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      ellipsis: true,
      render: (v: string) => v ? <Text type="secondary">{v}</Text> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      width: 130,
      align: 'center',
      render: (isActive: boolean) => {
        const active = isActive !== false;
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 12px',
              borderRadius: 20,
              background: active ? '#52c41a18' : '#ff4d4f18',
              border: `1.5px solid ${active ? '#52c41a' : '#ff4d4f'}`,
              color: active ? '#52c41a' : '#ff4d4f',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: active ? '#52c41a' : '#ff4d4f', flexShrink: 0 }} />
            {active ? 'Hoạt động' : 'Đã xóa mềm'}
          </span>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 120,
      render: (v: string) => v
        ? <Text type="secondary" className="text-xs">{new Date(v).toLocaleDateString('vi-VN')}</Text>
        : '—',
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 140,
      render: (_: unknown, record: BrandResponse) => {
        const active = record.isActive !== false;
        return (
          <Space size={4}>
            {/* Chỉnh sửa */}
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text" size="small" icon={<EditOutlined />}
                onClick={() => handleOpenEdit(record)}
                style={{ color: '#c5a880' }}
              />
            </Tooltip>

            {/* Xóa mềm / Khôi phục */}
            <Tooltip title={active ? "Xóa mềm (Tạm khóa / Ẩn)" : "Khôi phục hoạt động"}>
              <Button
                type="text" size="small"
                icon={active ? <StopOutlined /> : <UndoOutlined />}
                onClick={() => handleSoftDeleteToggle(record)}
                style={{ color: active ? '#fa8c16' : '#52c41a' }}
              />
            </Tooltip>

            {/* Xóa cứng (Vĩnh viễn) */}
            <Tooltip title="Xóa cứng (Vĩnh viễn khỏi Database)">
              <Button
                type="text" size="small" danger icon={<DeleteOutlined />}
                onClick={() => handleHardDelete(record)}
              />
            </Tooltip>
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
            <ShopOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Quản lý Thương hiệu (Soft & Hard Delete)
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Hỗ trợ xóa mềm (Vô hiệu hóa) & xóa cứng (Xóa vĩnh viễn)
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Bộ lọc trạng thái Xóa mềm / Thùng rác */}
          <Segmented
            options={[
              { label: `Tất cả (${brandList.length})`, value: 'ALL' },
              { label: 'Hoạt động', value: 'ACTIVE' },
              { label: 'Thùng rác / Đã ẩn', value: 'TRASH' },
            ]}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as 'ALL' | 'ACTIVE' | 'TRASH')}
          />

          <Button
            type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}
            style={{
              background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
              border: 'none', borderRadius: 8, fontWeight: 600,
              boxShadow: '0 4px 12px rgba(197,168,128,0.35)', color: '#fff',
            }}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredBrands}
        loading={loading}
        size="middle"
        bordered={false}
        pagination={filteredBrands.length > 10 ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] } : false}
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        rowClassName="hover:bg-[#fafafa] transition-colors"
      />

      <BrandFormModal
        open={modalOpen}
        editing={editing}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default BrandsPage;
