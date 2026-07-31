import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm, Tag, Image, Switch } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useProductImageList, useCreateProductImage, useDeleteProductImage } from '../hooks/useProductImage';
import { useProductList } from '../hooks/useProduct';
import type { ProductImage, ProductImageRequest } from '../types/product-image-type';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const ProductImagePage: React.FC = () => {
  const { data: images, isLoading } = useProductImageList();
  const { data: products } = useProductList();
  
  const createImage = useCreateProductImage();
  const deleteImage = useDeleteProductImage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (values: ProductImageRequest) => {
    createImage.mutate(values, {
      onSuccess: () => setIsModalOpen(false)
    });
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
      title: 'Hình ảnh', 
      dataIndex: 'image', 
      key: 'image',
      render: (url: string) => <Image src={url} width={60} height={60} className="object-cover rounded" />
    },
    { 
      title: 'Ảnh chính', 
      dataIndex: 'isMainImage', 
      key: 'isMainImage',
      render: (val: boolean) => <Switch checked={val} disabled />
    },
    { 
      title: 'Ngày tải lên', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (val: string) => dayjs(val).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (_: any, record: ProductImage) => (
        <Space>
          <Popconfirm
            title="Xóa hình ảnh này?"
            onConfirm={() => deleteImage.mutate(record.id)}
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
    { name: 'image', label: 'URL Hình ảnh', type: 'text' as const, required: true },
    { 
      name: 'isMainImage', 
      label: 'Đặt làm ảnh chính', 
      type: 'select' as const, 
      required: true,
      options: [{label: 'Có', value: true}, {label: 'Không', value: false}]
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Quản lý Hình ảnh Sản phẩm</Title>
        <Button 
          type="primary" 
          onClick={() => setIsModalOpen(true)}
        >
          Thêm mới
        </Button>
      </div>

      <TableCustom
        columns={columns}
        dataSource={images || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title="Thêm hình ảnh"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        fields={formFields}
      />
    </div>
  );
};

export default ProductImagePage;
