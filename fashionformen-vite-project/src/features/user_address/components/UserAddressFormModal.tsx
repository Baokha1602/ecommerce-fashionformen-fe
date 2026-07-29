import React, { useEffect } from 'react';
import { Modal, Form, Input, Switch, Button, Select, InputNumber } from 'antd';
import { USER_ADDRESS_FORM_FIELDS, ADDRESS_TYPE_LABEL } from '../constants/user_address-constants';
import { UserAddressCreateRequestAddressTypeEnum } from '../types/user_address-type';
import type { UserAddressResponse, UserAddressCreateRequest, UserAddressUpdateRequest } from '../types/user_address-type';

interface UserAddressFormModalProps {
  open: boolean;
  editing: UserAddressResponse | null;
  submitting: boolean;
  onSubmit: (values: UserAddressCreateRequest | UserAddressUpdateRequest) => void;
  onClose: () => void;
}

const addressTypeOptions = Object.values(UserAddressCreateRequestAddressTypeEnum).map((v) => ({
  value: v,
  label: ADDRESS_TYPE_LABEL[v] ?? v,
}));

export const UserAddressFormModal: React.FC<UserAddressFormModalProps> = ({
  open, editing, submitting, onSubmit, onClose,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editing) {
        form.setFieldsValue({
          userId: editing.userId,
          address: editing.address,
          addressType: editing.addressType,
          provinceId: editing.provinceId,
          provinceName: editing.provinceName,
          districtId: editing.districtId,
          districtName: editing.districtName,
          wardId: editing.wardId,
          wardName: editing.wardName,
          isDefault: editing.isDefault ?? false,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ addressType: UserAddressCreateRequestAddressTypeEnum.Home, isDefault: false });
      }
    }
  }, [open, editing, form]);

  const handleOk = () => { form.validateFields().then(onSubmit); };

  return (
    <Modal
      open={open} onCancel={onClose} width={560}
      title={<span className="font-semibold text-base">{editing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</span>}
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
          name={USER_ADDRESS_FORM_FIELDS.USER_ID}
          label="User ID"
          rules={[{ required: true, message: 'Vui lòng nhập User ID!' }]}
        >
          <InputNumber min={1} className="w-full" disabled={!!editing} />
        </Form.Item>
        <Form.Item
          name={USER_ADDRESS_FORM_FIELDS.ADDRESS}
          label="Địa chỉ chi tiết"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input.TextArea rows={2} placeholder="Số nhà, tên đường..." />
        </Form.Item>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.PROVINCE_ID}
            label="Mã tỉnh/thành"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.PROVINCE_NAME}
            label="Tên tỉnh/thành"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <Input placeholder="Hà Nội..." />
          </Form.Item>
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.DISTRICT_ID}
            label="Mã quận/huyện"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.DISTRICT_NAME}
            label="Tên quận/huyện"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <Input placeholder="Cầu Giấy..." />
          </Form.Item>
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.WARD_ID}
            label="Mã phường/xã"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <Input placeholder="Mã GHN..." />
          </Form.Item>
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.WARD_NAME}
            label="Tên phường/xã"
            rules={[{ required: true, message: 'Bắt buộc!' }]}
          >
            <Input placeholder="Dịch Vọng..." />
          </Form.Item>
        </div>
        <Form.Item
          name={USER_ADDRESS_FORM_FIELDS.ADDRESS_TYPE}
          label="Loại địa chỉ"
          rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
        >
          <Select options={addressTypeOptions} />
        </Form.Item>
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.IS_DEFAULT} label="Địa chỉ mặc định" valuePropName="checked">
          <Switch checkedChildren="Mặc định" unCheckedChildren="Không" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
