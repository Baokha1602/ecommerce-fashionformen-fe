import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  App,
  Typography,
  Space,
  Input,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from '../store/category-thunk';
import { clearError } from '../store/category-slice';
import { CategoryFormModal } from '../components/CategoryFormModal';
import type { CategoryResponse, CategoryUpsertRequest } from '../types/category-type';

const { Title, Text } = Typography;

const CategoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.category);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryResponse | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: CategoryResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: CategoryUpsertRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateCategoryThunk({ id: editing.id, body: values }));
      if (updateCategoryThunk.fulfilled.match(result)) {
        message.success('Cập nhật danh mục thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createCategoryThunk(values));
      if (createCategoryThunk.fulfilled.match(result)) {
        message.success('Tạo danh mục thành công!');
        handleCloseModal();
      }
    }
  };

  const handleDelete = (record: CategoryResponse) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: (
        <span>
          Bạn có chắc muốn xóa danh mục{' '}
          <strong style={{ color: '#c5a880' }}>{record.name}</strong> không?
        </span>
      ),
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteCategoryThunk(record.id!));
        if (deleteCategoryThunk.fulfilled.match(result)) {
          message.success('Xóa danh mục thành công!');
        }
      },
    });
  };

  // Lọc theo search text
  const filteredList = searchText
    ? list.filter((c) =>
        c.name?.toLowerCase().includes(searchText.toLowerCase()),
      )
    : list;

  const columns: ColumnsType<CategoryResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      align: 'center',
      render: (v: number) => (
        <Text type="secondary" className="text-xs font-mono">#{v}</Text>
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      render: (name: string) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c5a880, #d4af37)',
              flexShrink: 0,
            }}
          />
          <Text strong style={{ color: '#1a1a1a' }}>{name}</Text>
        </span>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 140,
      render: (v: string) =>
        v ? (
          <Text type="secondary" className="text-xs">
            {new Date(v).toLocaleDateString('vi-VN')}
          </Text>
        ) : (
          '—'
        ),
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAt',
      width: 140,
      render: (v: string) =>
        v ? (
          <Text type="secondary" className="text-xs">
            {new Date(v).toLocaleDateString('vi-VN')}
          </Text>
        ) : (
          '—'
        ),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 100,
      render: (_: unknown, record: CategoryResponse) => (
        <Space size={4}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
            style={{ color: '#c5a880' }}
            title="Chỉnh sửa"
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            title="Xóa"
          />
        </Space>
      ),
    },
  ];

  return (
    // Không dùng overflow-auto hay min-h-screen — để layout cha kiểm soát scroll
    <div>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #c5a88025 0%, #d4af3725 100%)',
              border: '1.5px solid #c5a88040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppstoreOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Danh mục sản phẩm
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Quản lý các danh mục phân loại sản phẩm
            </Text>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Thống kê nhỏ */}
          <span
            style={{
              padding: '4px 12px',
              borderRadius: 20,
              background: '#c5a88015',
              border: '1.5px solid #c5a88030',
              color: '#c5a880',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {list.length} danh mục
          </span>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenCreate}
            style={{
              background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(197,168,128,0.35)',
              color: '#fff',
            }}
          >
            Thêm danh mục
          </Button>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <Input
          prefix={<SearchOutlined style={{ color: '#c5a880' }} />}
          placeholder="Tìm kiếm danh mục..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{
            maxWidth: 320,
            borderRadius: 8,
            borderColor: '#c5a88040',
          }}
        />
      </div>

      {/* ── Table — không set scroll={{ x }} để tránh scrollbar ngang */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredList}
        loading={loading}
        size="middle"
        bordered={false}
        pagination={
          filteredList.length > 10
            ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] }
            : false
        }
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
        rowClassName="hover:bg-[#fafafa] transition-colors"
        locale={{
          emptyText: searchText
            ? `Không tìm thấy danh mục nào với từ khóa "${searchText}"`
            : 'Chưa có danh mục nào',
        }}
      />

      {/* ── Form Modal ───────────────────────────────────────── */}
      <CategoryFormModal
        open={modalOpen}
        editing={editing}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CategoryPage;
