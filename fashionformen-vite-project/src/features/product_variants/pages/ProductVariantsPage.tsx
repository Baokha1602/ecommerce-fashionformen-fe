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
import { PlusOutlined, EditOutlined, DeleteOutlined, ControlOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllProductVariantsThunk,
  createProductVariantThunk,
  updateProductVariantThunk,
  deleteProductVariantThunk,
} from '../store/product_variants-thunk';
import { clearError } from '../store/product_variants-slice';
import { ProductVariantFormModal } from '../components/ProductVariantFormModal';

import type { ProductVariantResponse, ProductVariantRequest } from '../types/product_variants-type';

const { Title, Text } = Typography;



const ProductVariantsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.productVariants);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductVariantResponse | null>(null);

  useEffect(() => {
    dispatch(fetchAllProductVariantsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: ProductVariantResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: ProductVariantRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateProductVariantThunk({ id: editing.id, body: values }));
      if (updateProductVariantThunk.fulfilled.match(result)) {
        message.success('Cập nhật biến thể sản phẩm thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createProductVariantThunk(values));
      if (createProductVariantThunk.fulfilled.match(result)) {
        message.success('Tạo biến thể sản phẩm thành công!');
        handleCloseModal();
      }
    }
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc muốn xóa biến thể này không?',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteProductVariantThunk(id));
        if (deleteProductVariantThunk.fulfilled.match(result)) {
          message.success('Xóa biến thể sản phẩm thành công!');
        }
      },
    });
  };

  const columns: ColumnsType<ProductVariantResponse> = [
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
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      render: (v: string) => <Text strong>{v}</Text>,
    },
    {
      title: 'Tên biến thể',
      dataIndex: 'name',
      render: (name: string) => (
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 12px', borderRadius: 20,
            background: '#c5a88018', border: '1.5px solid #c5a880',
            color: '#c5a880', fontWeight: 700, fontSize: 12,
          }}
        >
          {name}
        </span>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      align: 'right',
      render: (v: number) => <Text strong>{v?.toLocaleString('vi-VN')} đ</Text>,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discountRate',
      align: 'center',
      render: (v: number) => v > 0 ? (
        <Badge
          count={`-${v}%`}
          style={{ backgroundColor: '#ff4d4f', fontWeight: 700, fontSize: 12 }}
        />
      ) : <Text type="secondary">—</Text>,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stockTotal',
      align: 'center',
      render: (v: number) => <Text>{v?.toLocaleString('vi-VN') ?? 0}</Text>,
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 100,
      render: (_: unknown, record: ProductVariantResponse) => (
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
            <ControlOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Biến thể sản phẩm
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Quản lý các loại biến thể, giá bán và tồn kho của sản phẩm
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
          Thêm biến thể mới
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
      <ProductVariantFormModal
        open={modalOpen}
        editing={editing}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductVariantsPage;
