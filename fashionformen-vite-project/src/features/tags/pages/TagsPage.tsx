import React, { useEffect, useState } from 'react';
import { Table, Button, App, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, TagsOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllTagsThunk, createTagThunk, updateTagThunk, deleteTagThunk,
} from '../store/tags-thunk';
import { clearError } from '../store/tags-slice';
import { TagFormModal } from '../components/TagFormModal';
import type { TagResponse, TagCreateRequest, TagUpdateRequest } from '../types/tags-type';

const { Title, Text } = Typography;

const TagsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.tags);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TagResponse | null>(null);

  useEffect(() => { dispatch(fetchAllTagsThunk()); }, [dispatch]);

  useEffect(() => {
    if (error) { message.error(error); dispatch(clearError()); }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: TagResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: TagCreateRequest | TagUpdateRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateTagThunk({ id: editing.id, body: values as TagUpdateRequest }));
      if (updateTagThunk.fulfilled.match(result)) {
        message.success('Cập nhật tag thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createTagThunk(values as TagCreateRequest));
      if (createTagThunk.fulfilled.match(result)) {
        message.success('Tạo tag thành công!');
        handleCloseModal();
      }
    }
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa tag này không?',
      okText: 'Xóa', okButtonProps: { danger: true }, cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteTagThunk(id));
        if (deleteTagThunk.fulfilled.match(result)) message.success('Xóa tag thành công!');
      },
    });
  };

  const columns: ColumnsType<TagResponse> = [
    {
      title: 'ID', dataIndex: 'id', width: 60, align: 'center',
      render: (v: number) => <Text type="secondary" className="text-xs font-mono">#{v}</Text>,
    },
    {
      title: 'Tên tag', dataIndex: 'name',
      render: (name: string) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '3px 12px', borderRadius: 20,
          background: '#c5a88018', border: '1.5px solid #c5a880',
          color: '#c5a880', fontWeight: 700, fontSize: 12,
        }}>
          <TagsOutlined style={{ fontSize: 10 }} />{name}
        </span>
      ),
    },
    {
      title: 'Mô tả', dataIndex: 'description', ellipsis: true,
      render: (v: string) => v ? <Text type="secondary">{v}</Text> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Ngày tạo', dataIndex: 'createdAt', width: 120,
      render: (v: string) => v
        ? <Text type="secondary" className="text-xs">{new Date(v).toLocaleDateString('vi-VN')}</Text>
        : '—',
    },
    {
      title: 'Thao tác', align: 'center', width: 100,
      render: (_: unknown, record: TagResponse) => (
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
            <TagsOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>Tags sản phẩm</Title>
            <Text type="secondary" style={{ fontSize: 12 }}>Quản lý danh sách nhãn / tag sản phẩm</Text>
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
          Thêm tag mới
        </Button>
      </div>

      <Table
        rowKey="id" columns={columns} dataSource={Array.isArray(list) ? list : []} loading={loading}
        size="middle" bordered={false}
        pagination={Array.isArray(list) && list.length > 10 ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] } : false}
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        rowClassName="hover:bg-[#fafafa] transition-colors"
      />

      <TagFormModal open={modalOpen} editing={editing} submitting={submitting} onSubmit={handleSubmit} onClose={handleCloseModal} />
    </div>
  );
};

export default TagsPage;
