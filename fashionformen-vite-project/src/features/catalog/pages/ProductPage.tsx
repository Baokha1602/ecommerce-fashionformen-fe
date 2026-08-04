import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm, Tag, Alert } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useProductList, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProduct';
import { useCategoryList } from '../hooks/useCategory';
import { useBrandList } from '../hooks/useBrand';
import type { Product, ProductRequest } from '../types/product-type';
import dayjs from 'dayjs';

const { Title } = Typography;

const ProductPage: React.FC = () => {
  const { data: products, isLoading } = useProductList();
  const { data: categories } = useCategoryList();
  const { data: brands } = useBrandList();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreate = (values: ProductRequest) => {
    createProduct.mutate(values, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const handleUpdate = (values: ProductRequest) => {
    if (editingId) {
      updateProduct.mutate({ id: editingId, data: values }, {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingId(null);
        }
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { 
      title: 'Danh mục', 
      dataIndex: 'categoryId', 
      key: 'categoryId',
      render: (id: number) => {
        const cat = categories?.find(c => c.id === id);
        return cat ? <Tag color="blue">{cat.name}</Tag> : <Tag>N/A</Tag>;
      }
    },
    { 
      title: 'Thương hiệu', 
      dataIndex: 'brandId', 
      key: 'brandId',
      render: (id: number) => {
        const brand = brands?.find(b => b.id === id);
        return brand ? <Tag color="purple">{brand.name}</Tag> : <Tag>N/A</Tag>;
      }
    },
    { title: 'Đã bán', dataIndex: 'soldQuantity', key: 'soldQuantity' },
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
      render: (_: any, record: Product) => (
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
            title="Xóa sản phẩm này?"
            onConfirm={() => deleteProduct.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formFields = [
    { name: 'name', label: 'Tên sản phẩm', type: 'text' as const, required: true },
    { 
      name: 'categoryId', 
      label: 'Danh mục', 
      type: 'select' as const, 
      required: true,
      options: categories?.map(c => ({ label: c.name, value: c.id })) || []
    },
    { 
      name: 'brandId', 
      label: 'Thương hiệu', 
      type: 'select' as const, 
      required: true,
      options: brands?.map(b => ({ label: b.name, value: b.id })) || []
    },
    { name: 'description', label: 'Mô tả', type: 'textarea' as const }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Quản lý Sản phẩm</Title>
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

      <Alert
        message="Hướng dẫn tạo sản phẩm"
        description={
          <ul className="list-disc pl-4 mb-0 text-gray-600">
            <li>Bước 1: Tạo sản phẩm cơ bản ở đây (Tên, Danh mục, Thương hiệu, Mô tả)</li>
            <li>Bước 2: Sang tab <b>Biến thể (Variants)</b> để thêm thông tin Giá bán, Giá khuyến mãi và Tồn kho</li>
            <li>Bước 3: Sang tab <b>Hình ảnh (Images)</b> để upload ảnh cho sản phẩm</li>
          </ul>
        }
        type="info"
        showIcon
        className="mb-6 shadow-sm rounded-xl border-blue-200"
      />

      <TableCustom
        columns={columns}
        dataSource={products || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title={editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingId(null); }}
        onSubmit={editingId ? handleUpdate : handleCreate}
        fields={formFields}
        initialValues={editingId ? products?.find(p => p.id === editingId) : undefined}
      />
    </div>
  );
};

export default ProductPage;
