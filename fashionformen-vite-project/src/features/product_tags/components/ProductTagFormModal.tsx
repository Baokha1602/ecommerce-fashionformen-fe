// @ts-nocheck
import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { RANKS_FORM_FIELDS} from '../constants/product_tags-constants';

import type { ProductTagResponse, ProductTagRequest } from '../types/product_tags-type';

interface ProductTagFormModalProps {
  open: boolean;
  editing: ProductTagResponse | null;
  submitting: boolean;
  onSubmit: (values: ProductTagRequest) => void;
  onClose: () => void;
}



export const ProductTagFormModal: React.FC<ProductTagFormModalProps> = ({
  open,
  editing,
  submitting,
  onSubmit,
  onClose,
}) => {
  const [form] = Form.useForm<ProductTagRequest>();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue(editing as any);
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
          {editing ? 'Chỉnh sửa hạng thành viên' : 'Thêm hạng thành viên mới'}
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
          className="bg-[#c5a880] border-none hover:bg-[#d4af37] text-[#0d0d0d] font-semibold"
        >
          {editing ? 'Lưu thay đổi' : 'Tạo mới'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="pt-2">
        <Form.Item
          name={RANKS_FORM_FIELDS.RANK_NAME}
          label="Tên hạng"
          rules={[{ required: true, message: 'Vui lòng chọn tên hạng!' }]}
        >
          <Input placeholder="Nhập tên..." />
        </Form.Item>

        <Form.Item
          name={RANKS_FORM_FIELDS.POINT}
          label="Điểm tối thiểu"
          rules={[{ required: true, message: 'Vui lòng nhập số điểm!' }]}
        >
          <InputNumber min={0} className="w-full" placeholder="Ví dụ: 1000" />
        </Form.Item>

        <Form.Item
          name={RANKS_FORM_FIELDS.RANK_DISCOUNT}
          label="Mức giảm giá (%)"
          rules={[{ required: true, message: 'Vui lòng nhập mức giảm giá!' }]}
        >
          <InputNumber min={0} max={100} className="w-full" placeholder="Ví dụ: 5" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
