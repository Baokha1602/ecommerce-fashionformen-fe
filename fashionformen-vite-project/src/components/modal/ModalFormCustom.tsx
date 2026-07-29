import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Switch } from 'antd';

type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'switch';

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string | number | boolean }[];
}

interface ModalFormCustomProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  fields: FieldConfig[];
  initialValues?: any;
}

const ModalFormCustom: React.FC<ModalFormCustomProps> = ({
  title,
  open,
  onCancel,
  onSubmit,
  fields,
  initialValues
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
    });
  };

  return (
    <Modal
      title={<div className="font-bold text-lg mb-4">{title}</div>}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Lưu"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={<span className="font-semibold">{field.label}</span>}
            rules={[{ required: field.required, message: `Vui lòng nhập ${field.label.toLowerCase()}` }]}
            valuePropName={field.type === 'switch' ? 'checked' : 'value'}
          >
            {field.type === 'text' && <Input size="large" />}
            {field.type === 'textarea' && <Input.TextArea rows={4} size="large" />}
            {field.type === 'number' && <InputNumber className="w-full" size="large" />}
            {field.type === 'select' && (
              <Select size="large" options={field.options} />
            )}
            {field.type === 'switch' && <Switch />}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default ModalFormCustom;
