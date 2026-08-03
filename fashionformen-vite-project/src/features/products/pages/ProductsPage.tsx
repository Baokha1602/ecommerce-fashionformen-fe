// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  App,
  Typography,
  Space,
  Badge,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, CrownOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllProductsThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from '../store/products-thunk';
import { clearError } from '../store/products-slice';
import { ProductFormModal } from '../components/ProductFormModal';

import type { ProductResponse, ProductRequest } from '../types/products-type';

const { Title, Text } = Typography;

// Badge màu theo hạng — dùng dot + text để tránh bị mờ trên nền trắng
const ProductBadgeGeneric: React.FC<any> = (props: any) => {
  const name = Object.values(props)[0] as string;

  const color = '#1890ff';
  const label = name || 'N/A';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 12px',
        borderRadius: 20,
        background: `${color}18`,       // 10% opacity fill
        border: `1.5px solid ${color}`,
        color: color,
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '0.03em',
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

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.products);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductResponse | null>(null);

  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: ProductResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: ProductRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateProductThunk({ id: editing.id, body: values }));
      if (updateProductThunk.fulfilled.match(result)) {
        message.success('Cập nhật hạng thành viên thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createProductThunk(values));
      if (createProductThunk.fulfilled.match(result)) {
        message.success('Tạo hạng thành viên thành công!');
        handleCloseModal();
      }
    }
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa hạng thành viên này không?',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteProductThunk(id));
        if (deleteProductThunk.fulfilled.match(result)) {
          message.success('Xóa hạng thành viên thành công!');
        }
      },
    });
  };

  const columns: ColumnsType<ProductResponse> = [
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
      title: 'Hạng',
      dataIndex: 'productName',
      width: 160,
      render: (productName: string) => <ProductBadgeGeneric val={productName} />,
    },
    {
      title: 'Điểm tối thiểu',
      dataIndex: 'point',
      align: 'right',
      render: (v: number) => (
        <Text strong>{v?.toLocaleString('vi-VN')} điểm</Text>
      ),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'productDiscount',
      align: 'center',
      width: 110,
      render: (v: number) => (
        <Badge
          count={`${v}%`}
          style={{
            backgroundColor: v > 0 ? '#f6ffed' : '#f5f5f5',
            color: v > 0 ? '#52c41a' : '#999',
            border: `1px solid ${v > 0 ? '#b7eb8f' : '#ddd'}`,
            fontWeight: 700,
            fontSize: 12,
            padding: '0 8px',
          }}
        />
      ),
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
      width: 100,
      render: (_: unknown, record: ProductResponse) => (
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
            onClick={() => handleDelete(record.id!)}
            title="Xóa"
          />
        </Space>
      ),
    },
  ];

  return (
    // Không dùng overflow-auto, height cố định — để layout cha kiểm soát scroll
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
            <CrownOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Hạng thành viên
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Quản lý các mức hạng tích điểm và ưu đãi
            </Text>
          </div>
        </div>

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
          Thêm hạng mới
        </Button>
      </div>

      {/* ── Table ── không set scroll={{ x }} để tránh scrollbar ngang */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        loading={loading}
        size="middle"
        bordered={false}
        pagination={
          list.length > 10
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
      <ProductFormModal
        open={modalOpen}
        editing={editing}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductsPage;
