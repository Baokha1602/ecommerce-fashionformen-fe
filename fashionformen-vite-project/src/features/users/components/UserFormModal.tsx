import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import type { UserResponse, UserUpdateRequest } from '../types/users-type';
import dayjs from 'dayjs';

interface UserFormModalProps {
  open: boolean;
  editing: UserResponse | null;
  submitting: boolean;
  onSubmit: (values: UserUpdateRequest) => void;
  onClose: () => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  open, editing, submitting, onSubmit, onClose,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && editing) {
      form.setFieldsValue({
        fullName: editing.fullName || '',
        email: editing.email || '',
        phone: editing.phone || '',
        avatarUrl: editing.avatarUrl || '',
        dateOfBirth: editing.dateOfBirth ? dayjs(editing.dateOfBirth) : null,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [open, editing, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const payload: UserUpdateRequest = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        avatarUrl: values.avatarUrl,
        dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : undefined,
      };
      onSubmit(payload);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={520}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #c5a88025, #d4af3725)',
            border: '1.5px solid #c5a88040',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14 }}>✏️</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>
            Chỉnh sửa thông tin khách hàng
          </span>
        </div>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>Hủy</Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleOk}
          style={{
            background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
            border: 'none', fontWeight: 600, color: '#fff',
          }}
        >
          Lưu thay đổi
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="pt-2">
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Nhập họ và tên khách hàng" />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
          >
            <Input placeholder="0xxxxxxxxx" />
          </Form.Item>
        </div>

        <Form.Item name="dateOfBirth" label="Ngày sinh">
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name="avatarUrl" label="URL ảnh đại diện">
          <Input placeholder="https://..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
