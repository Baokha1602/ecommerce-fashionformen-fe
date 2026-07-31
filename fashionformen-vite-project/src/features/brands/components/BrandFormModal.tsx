import React, { useEffect } from 'react';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { BRANDS_FORM_FIELDS } from '../constants/brands-constants';
import type { BrandResponse, BrandUpsertRequest } from '../types/brands-type';

interface BrandFormModalProps {
  open: boolean;
  editing: BrandResponse | null;
  submitting: boolean;
  onSubmit: (values: BrandUpsertRequest) => void;
  onClose: () => void;
}

export const BrandFormModal: React.FC<BrandFormModalProps> = ({
  open, editing, submitting, onSubmit, onClose,
}) => {
  const [form] = Form.useForm<BrandUpsertRequest>();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({
          name: editing.name,
          description: editing.description,
          logoUrl: editing.logoUrl,
          isActive: editing.isActive ?? true,
        });
      } else {
        form.resetFields();
        form.setFieldValue(BRANDS_FORM_FIELDS.IS_ACTIVE, true);
      }
    }
  }, [open, editing, form]);

  const handleOk = () => { form.validateFields().then(onSubmit); };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <span className="font-semibold text-base">
          {editing ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}
        </span>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>Hủy</Button>,
        <Button
          key="submit" type="primary" loading={submitting} onClick={handleOk}
          style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)', border: 'none', fontWeight: 600, color: '#fff' }}
        >
          {editing ? 'Lưu thay đổi' : 'Tạo mới'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="pt-2">
        <Form.Item
          name={BRANDS_FORM_FIELDS.NAME}
          label="Tên thương hiệu"
          rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
        >
          <Input placeholder="Ví dụ: Nike, Adidas..." />
        </Form.Item>
        <Form.Item name={BRANDS_FORM_FIELDS.DESCRIPTION} label="Mô tả">
          <Input.TextArea rows={3} placeholder="Mô tả ngắn về thương hiệu..." />
        </Form.Item>
        <Form.Item name={BRANDS_FORM_FIELDS.LOGO_URL} label="URL Logo">
          <Input placeholder="https://example.com/logo.png" />
        </Form.Item>
        <Form.Item name={BRANDS_FORM_FIELDS.IS_ACTIVE} label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Ẩn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
