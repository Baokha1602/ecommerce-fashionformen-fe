import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  App,
  Typography,
  Space,
  Input,
  Segmented,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  SearchOutlined,
  StopOutlined,
  UndoOutlined,
  ExclamationCircleOutlined,
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
import { ensureArray } from '@/shared/lib/ensure-array';

const { Title, Text } = Typography;

const CategoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.category);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryResponse | null>(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'DISABLED'>('ACTIVE');

  // Quản lý trạng thái vô hiệu hóa local nếu DTO chưa trả isActive
  const [softDeletedIds, setSoftDeletedIds] = useState<number[]>([]);

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

  // ── VÔ HIỆU HÓA / KHÔI PHỤC ──
  const handleSoftDeleteToggle = (record: CategoryResponse) => {
    const isSoftDeleted = softDeletedIds.includes(record.id!);
    if (isSoftDeleted) {
      setSoftDeletedIds((prev) => prev.filter((id) => id !== record.id));
      message.success(`Đã khôi phục danh mục "${record.name}"!`);
    } else {
      setSoftDeletedIds((prev) => [...prev, record.id!]);
      message.success(`Đã vô hiệu hóa danh mục "${record.name}"!`);
    }
  };

  // ── XÓA ──
  const handleHardDelete = (record: CategoryResponse) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: (
        <div>
          <p>Bạn có chắc chắn muốn xóa danh mục <strong>"{record.name}"</strong>?</p>
        </div>
      ),
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteCategoryThunk(record.id!));
        if (deleteCategoryThunk.fulfilled.match(result)) {
          setSoftDeletedIds((prev) => prev.filter((id) => id !== record.id));
          message.success(`Đã xóa danh mục "${record.name}" thành công!`);
        }
      },
    });
  };

  const categories = ensureArray(list);
  const activeCount = categories.filter(c => !softDeletedIds.includes(c.id!)).length;
  const disabledCount = softDeletedIds.length;

  const filteredList = categories.filter((c) => {
    const isSoftDeleted = softDeletedIds.includes(c.id!);
    if (statusFilter === 'ACTIVE' && isSoftDeleted) return false;
    if (statusFilter === 'DISABLED' && !isSoftDeleted) return false;

    if (!searchText) return true;
    return c.name?.toLowerCase().includes(searchText.toLowerCase());
  });

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
      render: (name: string, record: CategoryResponse) => {
        const isSoftDeleted = softDeletedIds.includes(record.id!);
        return (
          <span className="inline-flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: isSoftDeleted
                  ? '#ff4d4f'
                  : 'linear-gradient(135deg, #c5a880, #d4af37)',
              }}
            />
            <Text
              strong
              style={{
                color: isSoftDeleted ? '#8c8c8c' : '#1a1a1a',
                textDecoration: isSoftDeleted ? 'line-through' : 'none',
              }}
            >
              {name}
            </Text>
          </span>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 130,
      align: 'center',
      render: (_: unknown, record: CategoryResponse) => {
        const isSoftDeleted = softDeletedIds.includes(record.id!);
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 12px',
              borderRadius: 20,
              background: !isSoftDeleted ? '#52c41a18' : '#ff4d4f18',
              border: `1.5px solid ${!isSoftDeleted ? '#52c41a' : '#ff4d4f'}`,
              color: !isSoftDeleted ? '#52c41a' : '#ff4d4f',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: !isSoftDeleted ? '#52c41a' : '#ff4d4f',
                flexShrink: 0,
              }}
            />
            {!isSoftDeleted ? 'Hoạt động' : 'Vô hiệu hóa'}
          </span>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 130,
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
      width: 140,
      render: (_: unknown, record: CategoryResponse) => {
        const isSoftDeleted = softDeletedIds.includes(record.id!);
        return (
          <Space size={4}>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleOpenEdit(record)}
                style={{ color: '#c5a880' }}
              />
            </Tooltip>

            <Tooltip title={isSoftDeleted ? 'Khôi phục' : 'Vô hiệu hóa'}>
              <Button
                type="text"
                size="small"
                icon={isSoftDeleted ? <UndoOutlined /> : <StopOutlined />}
                onClick={() => handleSoftDeleteToggle(record)}
                style={{ color: isSoftDeleted ? '#52c41a' : '#fa8c16' }}
              />
            </Tooltip>

            <Tooltip title="Xóa">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
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
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
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
              Quản lý Danh mục
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Quản lý các danh mục sản phẩm
            </Text>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Segmented
            options={[
              { label: `Hoạt động (${activeCount})`, value: 'ACTIVE' },
              { label: `Vô hiệu hóa (${disabledCount})`, value: 'DISABLED' },
            ]}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as 'ACTIVE' | 'DISABLED')}
          />

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
            Thêm mới
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

      {/* ── Table ──────────────────────────────────────────────── */}
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
