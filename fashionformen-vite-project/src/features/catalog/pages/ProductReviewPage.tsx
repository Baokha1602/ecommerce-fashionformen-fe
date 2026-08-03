import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm, Tag, Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useProductReviewList, useCreateProductReview, useUpdateProductReview, useDeleteProductReview } from '../hooks/useProductReview';
import { useProductList } from '../hooks/useProduct';
import type { ProductReview, ProductReviewRequest } from '../types/product-review-type';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const ProductReviewPage: React.FC = () => {
  const { data: reviews, isLoading } = useProductReviewList();
  const { data: products } = useProductList();
  
  const createReview = useCreateProductReview();
  const updateReview = useUpdateProductReview();
  const deleteReview = useDeleteProductReview();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreate = (values: ProductReviewRequest) => {
    createReview.mutate({
      ...values,
      rating: Number(values.rating),
      userId: 1 // Default user id for demo
    }, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const handleUpdate = (values: ProductReviewRequest) => {
    if (editingId) {
      updateReview.mutate({ 
        id: editingId, 
        data: {
          ...values,
          rating: Number(values.rating),
          userId: 1
        } 
      }, {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingId(null);
        }
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { 
      title: 'Sản phẩm', 
      dataIndex: 'productId', 
      key: 'productId',
      render: (id: number) => {
        const product = products?.find(p => p.id === id);
        return product ? <Text strong>{product.name}</Text> : <Tag>N/A</Tag>;
      }
    },
    { 
      title: 'Đánh giá', 
      dataIndex: 'rating', 
      key: 'rating',
      render: (val: number) => <Rate disabled defaultValue={val} className="text-xs" />
    },
    { title: 'Nội dung', dataIndex: 'comment', key: 'comment' },
    { 
      title: 'Ngày tạo', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (val: string) => dayjs(val).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: ProductReview) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingId(record.id);
              setIsModalOpen(true);
            }} 
          />
          <Popconfirm
            title="Xóa đánh giá này?"
            onConfirm={() => deleteReview.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formFields = [
    { 
      name: 'productId', 
      label: 'Sản phẩm', 
      type: 'select' as const, 
      required: true,
      options: products?.map(p => ({ label: p.name, value: p.id })) || []
    },
    { name: 'rating', label: 'Đánh giá (1-5)', type: 'number' as const, required: true },
    { name: 'comment', label: 'Nội dung', type: 'textarea' as const, required: true },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Quản lý Đánh giá</Title>
        <Button 
          type="primary" 
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          Thêm đánh giá ảo
        </Button>
      </div>

      <TableCustom
        columns={columns}
        dataSource={reviews || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title={editingId ? 'Sửa đánh giá' : 'Thêm đánh giá'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={editingId ? handleUpdate : handleCreate}
        fields={formFields}
        initialValues={editingId ? reviews?.find(r => r.id === editingId) : undefined}
      />
    </div>
  );
};

export default ProductReviewPage;
