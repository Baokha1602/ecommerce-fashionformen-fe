import React, { useState } from 'react';
import { Space, Button, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableCustom from '@/components/table/TableCustom';
import ModalFormCustom from '@/components/modal/ModalFormCustom';
import { useCategoryList, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategory';
import type { Category, CategoryRequest } from '../types/category-type';
import dayjs from 'dayjs';

const { Title } = Typography;

const CategoryPage: React.FC = () => {
  const { data: categories, isLoading } = useCategoryList();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreate = (values: CategoryRequest) => {
    createCategory.mutate(values, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const handleUpdate = (values: CategoryRequest) => {
    if (editingId) {
      updateCategory.mutate({ id: editingId, data: values }, {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingId(null);
        }
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
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
      render: (_: any, record: Category) => (
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
            title="Xóa danh mục?"
            onConfirm={() => deleteCategory.mutate(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formFields = [
    { name: 'name', label: 'Tên danh mục', type: 'text' as const, required: true },
    { name: 'description', label: 'Mô tả', type: 'textarea' as const }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Quản lý Danh mục</Title>
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
        dataSource={categories || []}
        loading={isLoading}
        rowKey="id"
      />

      <ModalFormCustom
        title={editingId ? 'Sửa danh mục' : 'Thêm danh mục'}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingId(null); }}
        onSubmit={editingId ? handleUpdate : handleCreate}
        fields={formFields}
        initialValues={editingId ? categories?.find(c => c.id === editingId) : undefined}
      />
    </div>
  );
};

export default CategoryPage;
