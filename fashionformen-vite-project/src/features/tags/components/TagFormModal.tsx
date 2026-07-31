import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { TAGS_FORM_FIELDS } from '../constants/tags-constants';
import type { TagResponse, TagCreateRequest, TagUpdateRequest } from '../types/tags-type';

interface TagFormModalProps {
  open: boolean;
  editing: TagResponse | null;
  submitting: boolean;
  onSubmit: (values: TagCreateRequest | TagUpdateRequest) => void;
  onClose: () => void;
}

export const TagFormModal: React.FC<TagFormModalProps> = ({
  open, editing, submitting, onSubmit, onClose,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({ name: editing.name, description: editing.description });
      } else {
        form.resetFields();
      }
    }
  }, [open, editing, form]);

  const handleOk = () => { form.validateFields().then(onSubmit); };

  return (
    <Modal
      open={open} onCancel={onClose}
      title={<span className="font-semibold text-base">{editing ? 'Chỉnh sửa tag' : 'Thêm tag mới'}</span>}
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
          name={TAGS_FORM_FIELDS.NAME}
          label="Tên tag"
          rules={[{ required: true, message: 'Vui lòng nhập tên tag!' }]}
        >
          <Input placeholder="Ví dụ: áo polo, quần jeans..." />
        </Form.Item>
        <Form.Item name={TAGS_FORM_FIELDS.DESCRIPTION} label="Mô tả">
          <Input.TextArea rows={2} placeholder="Mô tả ngắn về tag..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
