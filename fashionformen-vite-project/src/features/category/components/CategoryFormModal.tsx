import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CATEGORY_FORM_FIELDS } from '../constants/category-constants';
import type { CategoryResponse, CategoryUpsertRequest } from '../types/category-type';

interface CategoryFormModalProps {
  open: boolean;
  editing: CategoryResponse | null;
  submitting: boolean;
  onSubmit: (values: CategoryUpsertRequest) => void;
  onClose: () => void;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  open,
  editing,
  submitting,
  onSubmit,
  onClose,
}) => {
  const [form] = Form.useForm<CategoryUpsertRequest>();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({ name: editing.name });
      } else {
        form.resetFields();
      }
    }
  }, [open, editing, form]);

  const handleOk = () => {
    form.validateFields().then(onSubmit);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <span className="font-semibold text-base">
          {editing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        </span>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleOk}
          style={{
            background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
            border: 'none',
            fontWeight: 600,
            color: '#fff',
          }}
        >
          {editing ? 'Lưu thay đổi' : 'Tạo mới'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="pt-2">
        <Form.Item
          name={CATEGORY_FORM_FIELDS.NAME}
          label="Tên danh mục"
          rules={[
            { required: true, message: 'Vui lòng nhập tên danh mục!' },
            { min: 2, message: 'Tên danh mục phải có ít nhất 2 ký tự!' },
          ]}
        >
          <Input placeholder="Ví dụ: Áo sơ mi, Quần tây, Phụ kiện..." allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};
