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
  fetchAllProductReviewsThunk,
  createProductReviewThunk,
  updateProductReviewThunk,
  deleteProductReviewThunk,
} from '../store/product_reviews-thunk';
import { clearError } from '../store/product_reviews-slice';
import { ProductReviewFormModal } from '../components/ProductReviewFormModal';

import type { ProductReviewsResponse, ProductReviewsRequest } from '../types/product_reviews-type';

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

const ProductReviewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.productReviews);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductReviewsResponse | null>(null);

  useEffect(() => {
    dispatch(fetchAllProductReviewsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: ProductReviewsResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: ProductReviewsRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateProductReviewThunk({ id: editing.id, body: values }));
      if (updateProductReviewThunk.fulfilled.match(result)) {
        message.success('Cập nhật hạng thành viên thành công!');
        handleCloseModal();
      }
    } else {
      const result = await dispatch(createProductReviewThunk(values));
      if (createProductReviewThunk.fulfilled.match(result)) {
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
        const result = await dispatch(deleteProductReviewThunk(id));
        if (deleteProductReviewThunk.fulfilled.match(result)) {
          message.success('Xóa hạng thành viên thành công!');
        }
      },
    });
  };

  const columns: ColumnsType<ProductReviewsResponse> = [
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
      dataIndex: 'productReviewName',
      width: 160,
      render: (productReviewName: string) => <ProductBadgeGeneric val={productReviewName} />,
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
      dataIndex: 'productReviewDiscount',
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
      render: (_: unknown, record: ProductReviewsResponse) => (
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
      <ProductReviewFormModal
        open={modalOpen}
        editing={editing}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductReviewsPage;
