import React, { useEffect } from 'react';
import { Modal, Form, Input, Switch, InputNumber, Button } from 'antd';
import { BANNERS_FORM_FIELDS } from '../constants/banners-constants';
import type { BannerResponse, BannerUpsertRequest } from '../types/banners-type';

interface BannerFormModalProps {
  open: boolean;
  editing: BannerResponse | null;
  submitting: boolean;
  onSubmit: (values: BannerUpsertRequest) => void;
  onClose: () => void;
}

export const BannerFormModal: React.FC<BannerFormModalProps> = ({
  open, editing, submitting, onSubmit, onClose,
}) => {
  const [form] = Form.useForm<BannerUpsertRequest>();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({
          title: editing.title,
          imageUrl: editing.imageUrl,
          linkUrl: editing.linkUrl,
          displayOrder: editing.displayOrder,
          isActive: editing.isActive ?? true,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ isActive: true, displayOrder: 1 });
      }
    }
  }, [open, editing, form]);

  const handleOk = () => { form.validateFields().then(onSubmit); };

  return (
    <Modal
      open={open} onCancel={onClose}
      title={<span className="font-semibold text-base">{editing ? 'Chỉnh sửa banner' : 'Thêm banner mới'}</span>}
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
        <Form.Item name={BANNERS_FORM_FIELDS.TITLE} label="Tiêu đề">
          <Input placeholder="Tiêu đề banner..." />
        </Form.Item>
        <Form.Item
          name={BANNERS_FORM_FIELDS.IMAGE_URL}
          label="URL hình ảnh"
          rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
        >
          <Input placeholder="https://example.com/banner.jpg" />
        </Form.Item>
        <Form.Item name={BANNERS_FORM_FIELDS.LINK_URL} label="Đường dẫn liên kết">
          <Input placeholder="https://example.com/..." />
        </Form.Item>
        <Form.Item
          name={BANNERS_FORM_FIELDS.DISPLAY_ORDER}
          label="Thứ tự hiển thị"
          rules={[{ required: true, message: 'Vui lòng nhập thứ tự!' }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item name={BANNERS_FORM_FIELDS.IS_ACTIVE} label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Hiển thị" unCheckedChildren="Ẩn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
