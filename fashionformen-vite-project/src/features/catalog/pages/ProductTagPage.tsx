import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useProductTagList, useCreateProductTag, useDeleteProductTag } from '../hooks/useProductTag';
import { useProductList } from '../hooks/useProduct';
import { useTagList } from '../hooks/useTag';
import type { ProductTag, ProductTagRequest } from '../types/product-tag-type';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const ProductTagPage: React.FC = () => {
  const { data: productTags, isLoading } = useProductTagList();
  const { data: products } = useProductList();
  const { data: tags } = useTagList();
  
  const createProductTag = useCreateProductTag();
  const deleteProductTag = useDeleteProductTag();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (values: ProductTagRequest) => {
    createProductTag.mutate(values, {
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
      title: 'Tag', 
      dataIndex: 'tagId', 
      key: 'tagId',
      render: (id: number) => {
        const tag = tags?.find(t => t.id === id);
        return tag ? <Tag color="blue">{tag.name}</Tag> : <Tag>N/A</Tag>;
      }
    },
    { 
      title: 'Ngày gán', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (val: string) => dayjs(val).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (_: any, record: ProductTag) => (
        <Space>
          <Popconfirm
            title="Gỡ tag khỏi sản phẩm này?"
            onConfirm={() => deleteProductTag.mutate(record.id)}
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
    { 
      name: 'tagId', 
      label: 'Tag', 
      type: 'select' as const, 
      required: true,
      options: tags?.map(t => ({ label: t.name, value: t.id })) || []
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Gán Tag Sản phẩm</Title>
        <Button 
          type="primary" 
          onClick={() => setIsModalOpen(true)}
        >
          Gán Tag
        </Button>
      </div>

      <TableCustom
        columns={columns}
        dataSource={productTags || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title="Gán Tag cho sản phẩm"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        fields={formFields}
      />
    </div>
  );
};

export default ProductTagPage;
