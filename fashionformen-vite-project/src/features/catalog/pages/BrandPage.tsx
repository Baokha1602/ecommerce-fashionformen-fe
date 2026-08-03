import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useBrandList, useCreateBrand, useUpdateBrand, useDeleteBrand } from '../hooks/useBrand';
import type { Brand, BrandRequest } from '../types/brand-type';
import dayjs from 'dayjs';

const { Title } = Typography;

const BrandPage: React.FC = () => {
  const { data: brands, isLoading } = useBrandList();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreate = (values: BrandRequest) => {
    createBrand.mutate(values, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const handleUpdate = (values: BrandRequest) => {
    if (editingId) {
      updateBrand.mutate({ id: editingId, data: values }, {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingId(null);
        }
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên thương hiệu', dataIndex: 'name', key: 'name' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
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
      render: (_: any, record: Brand) => (
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
            title="Xóa thương hiệu này?"
            onConfirm={() => deleteBrand.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formFields = [
    { name: 'name', label: 'Tên thương hiệu', type: 'text' as const, required: true },
    { name: 'description', label: 'Mô tả', type: 'textarea' as const }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Quản lý Thương hiệu</Title>
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
        dataSource={brands || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title={editingId ? 'Sửa thương hiệu' : 'Thêm thương hiệu'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={editingId ? handleUpdate : handleCreate}
        fields={formFields}
        initialValues={editingId ? brands?.find(b => b.id === editingId) : undefined}
      />
    </div>
  );
};

export default BrandPage;
