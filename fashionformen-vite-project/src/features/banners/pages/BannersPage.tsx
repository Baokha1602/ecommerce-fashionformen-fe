import React, { useEffect, useState } from 'react';
import { Table, Button, App, Typography, Space, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllBannersThunk, createBannerThunk, updateBannerThunk, deleteBannerThunk,
} from '../store/banners-thunk';
import { clearError } from '../store/banners-slice';
import { BannerFormModal } from '../components/BannerFormModal';
import type { BannerResponse, BannerUpsertRequest } from '../types/banners-type';

const { Title, Text } = Typography;

const BannersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.banners);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BannerResponse | null>(null);

  useEffect(() => { dispatch(fetchAllBannersThunk()); }, [dispatch]);

  useEffect(() => {
    if (error) { message.error(error); dispatch(clearError()); }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: BannerResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: BannerUpsertRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateBannerThunk({ id: editing.id, body: values }));
      if (updateBannerThunk.fulfilled.match(result)) { message.success('Cập nhật banner thành công!'); handleCloseModal(); }
    } else {
      const result = await dispatch(createBannerThunk(values));
      if (createBannerThunk.fulfilled.match(result)) { message.success('Tạo banner thành công!'); handleCloseModal(); }
    }
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa', content: 'Bạn có chắc muốn xóa banner này không?',
      okText: 'Xóa', okButtonProps: { danger: true }, cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteBannerThunk(id));
        if (deleteBannerThunk.fulfilled.match(result)) message.success('Xóa banner thành công!');
      },
    });
  };

  const columns: ColumnsType<BannerResponse> = [
    {
      title: 'ID', dataIndex: 'id', width: 60, align: 'center',
      render: (v: number) => <Text type="secondary" className="text-xs font-mono">#{v}</Text>,
    },
    {
      title: 'Hình ảnh', dataIndex: 'imageUrl', width: 120, align: 'center',
      render: (url: string) => url
        ? <Image src={url} width={90} height={50} style={{ objectFit: 'cover', borderRadius: 8, border: '1px solid #f0f0f0' }} preview={false} />
        : (
          <div style={{ width: 90, height: 50, borderRadius: 8, border: '1.5px dashed #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PictureOutlined style={{ color: '#ccc', fontSize: 18 }} />
          </div>
        ),
    },
    {
      title: 'Tiêu đề', dataIndex: 'title',
      render: (v: string) => v ? <Text strong>{v}</Text> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Liên kết', dataIndex: 'linkUrl', ellipsis: true,
      render: (v: string) => v
        ? <a href={v} target="_blank" rel="noopener noreferrer" style={{ color: '#c5a880', fontSize: 12 }}>{v}</a>
        : <Text type="secondary">—</Text>,
    },
    {
      title: 'Thứ tự', dataIndex: 'displayOrder', width: 80, align: 'center',
      render: (v: number) => <Text strong>{v}</Text>,
    },
    {
      title: 'Trạng thái', dataIndex: 'isActive', width: 110, align: 'center',
      render: (isActive: boolean) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 12px',
          borderRadius: 20, background: isActive ? '#52c41a18' : '#88888818',
          border: `1.5px solid ${isActive ? '#52c41a' : '#888'}`,
          color: isActive ? '#52c41a' : '#888', fontWeight: 700, fontSize: 12,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: isActive ? '#52c41a' : '#888', flexShrink: 0 }} />
          {isActive ? 'Hiển thị' : 'Ẩn'}
        </span>
      ),
    },
    {
      title: 'Ngày tạo', dataIndex: 'createdAt', width: 120,
      render: (v: string) => v ? <Text type="secondary" className="text-xs">{new Date(v).toLocaleDateString('vi-VN')}</Text> : '—',
    },
    {
      title: 'Thao tác', align: 'center', width: 100,
      render: (_: unknown, record: BannerResponse) => (
        <Space size={4}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleOpenEdit(record)} style={{ color: '#c5a880' }} title="Chỉnh sửa" />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} title="Xóa" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #c5a88025 0%, #d4af3725 100%)',
            border: '1.5px solid #c5a88040',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PictureOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>Banner quảng cáo</Title>
            <Text type="secondary" style={{ fontSize: 12 }}>Quản lý hình ảnh banner hiển thị trên trang chủ</Text>
          </div>
        </div>
        <Button
          type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}
          style={{
            background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
            border: 'none', borderRadius: 8, fontWeight: 600,
            boxShadow: '0 4px 12px rgba(197,168,128,0.35)', color: '#fff',
          }}
        >
          Thêm banner
        </Button>
      </div>

      <Table
        rowKey="id" columns={columns} dataSource={Array.isArray(list) ? list : []} loading={loading}
        size="middle" bordered={false}
        pagination={Array.isArray(list) && list.length > 10 ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] } : false}
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        rowClassName="hover:bg-[#fafafa] transition-colors"
      />

      <BannerFormModal open={modalOpen} editing={editing} submitting={submitting} onSubmit={handleSubmit} onClose={handleCloseModal} />
    </div>
  );
};

export default BannersPage;
