import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Switch, Row, Col } from 'antd';
import dayjs from 'dayjs';
import type { CouponResponse, CouponCreateRequest, CouponUpdateRequest } from '../types/coupon-type';

interface CouponFormModalProps {
  open: boolean;
  editing: CouponResponse | null;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (values: CouponCreateRequest | CouponUpdateRequest) => void;
}

export const CouponFormModal: React.FC<CouponFormModalProps> = ({
  open,
  editing,
  loading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({
          ...editing,
          startDate: editing.startDate ? dayjs(editing.startDate) : null,
          endDate: editing.endDate ? dayjs(editing.endDate) : null,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          isActive: true,
        });
      }
    }
  }, [open, editing, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        startDate: values.startDate ? values.startDate.format('YYYY-MM-DDTHH:mm:ss') : null,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DDTHH:mm:ss') : null,
      };
      onSubmit(payload);
    });
  };

  return (
    <Modal
      title={editing ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá mới'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      width={700}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="code" label="Mã Coupon" rules={[{ required: !editing, message: 'Vui lòng nhập mã!' }]}>
              <Input placeholder="VD: SUMMER2026" disabled={!!editing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name" label="Tên Coupon" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input placeholder="VD: Khuyến mãi mùa hè" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="discountRate" label="Tỷ lệ giảm (%)" rules={[{ required: true, message: 'Nhập tỷ lệ!' }]}>
              <InputNumber min={0} max={100} className="w-full" addonAfter="%" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="maxDiscountAmount" label="Giảm tối đa (VNĐ)">
              <InputNumber<number>
                min={0}
                className="w-full"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                addonAfter="đ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="minOrderValue" label="Đơn tối thiểu (VNĐ)">
              <InputNumber<number>
                min={0}
                className="w-full"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                addonAfter="đ"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="startDate" label="Ngày bắt đầu">
              <DatePicker showTime className="w-full" format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endDate" label="Ngày kết thúc">
              <DatePicker showTime className="w-full" format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="usageLimit" label="Giới hạn sử dụng">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
              <Switch checkedChildren="Hoạt động" unCheckedChildren="Đã tắt" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
