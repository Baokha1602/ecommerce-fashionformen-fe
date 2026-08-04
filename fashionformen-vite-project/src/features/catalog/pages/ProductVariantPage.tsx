import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useProductVariantList, useCreateProductVariant, useUpdateProductVariant, useDeleteProductVariant } from '../hooks/useProductVariant';
import { useProductList } from '../hooks/useProduct';
import type { ProductVariant, ProductVariantRequest } from '../types/product-variant-type';


const { Title, Text } = Typography;

const ProductVariantPage: React.FC = () => {
  const { data: variants, isLoading } = useProductVariantList();
  const { data: products } = useProductList();
  
  const createVariant = useCreateProductVariant();
  const updateVariant = useUpdateProductVariant();
  const deleteVariant = useDeleteProductVariant();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreate = (values: ProductVariantRequest) => {
    createVariant.mutate({
      ...values,
      price: Number(values.price),
      discountPrice: values.discountPrice ? Number(values.discountPrice) : undefined,
      stockQuantity: Number(values.stockQuantity)
    }, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const handleUpdate = (values: ProductVariantRequest) => {
    if (editingId) {
      updateVariant.mutate({ 
        id: editingId, 
        data: {
          ...values,
          price: Number(values.price),
          discountPrice: values.discountPrice ? Number(values.discountPrice) : undefined,
          stockQuantity: Number(values.stockQuantity)
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
    { title: 'Mã SKU', dataIndex: 'sku', key: 'sku' },
    { 
      title: 'Giá bán', 
      dataIndex: 'price', 
      key: 'price',
      render: (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
    },
    { 
      title: 'Giá KM', 
      dataIndex: 'discountPrice', 
      key: 'discountPrice',
      render: (val: number | null) => val ? <Text type="success">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}</Text> : '-'
    },
    { title: 'Tồn kho', dataIndex: 'stockQuantity', key: 'stockQuantity' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (val: string) => <Tag color={val === 'ACTIVE' ? 'green' : 'red'}>{val}</Tag>
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: ProductVariant) => (
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
            title="Xóa biến thể này?"
            onConfirm={() => deleteVariant.mutate(record.id)}
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
    { name: 'sku', label: 'Mã SKU', type: 'text' as const, required: true },
    { name: 'price', label: 'Giá bán', type: 'number' as const, required: true },
    { name: 'discountPrice', label: 'Giá KM', type: 'number' as const },
    { name: 'stockQuantity', label: 'Số lượng tồn', type: 'number' as const, required: true },
    { 
      name: 'status', 
      label: 'Trạng thái', 
      type: 'select' as const, 
      required: true,
      options: [{label: 'Hoạt động', value: 'ACTIVE'}, {label: 'Ngừng bán', value: 'INACTIVE'}]
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Quản lý Biến thể Sản phẩm</Title>
        <Button 
          type="primary" 
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          Thêm mới
        </Button>
      </div>

      <TableCustom
        columns={columns}
        dataSource={variants || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title={editingId ? 'Sửa biến thể' : 'Thêm biến thể'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={editingId ? handleUpdate : handleCreate}
        fields={formFields}
        initialValues={editingId ? variants?.find(v => v.id === editingId) : undefined}
      />
    </div>
  );
};

export default ProductVariantPage;
