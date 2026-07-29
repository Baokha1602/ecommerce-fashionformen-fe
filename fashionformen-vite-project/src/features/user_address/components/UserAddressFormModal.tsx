import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Switch, Button, Select } from 'antd';
import { USER_ADDRESS_FORM_FIELDS, ADDRESS_TYPE_LABEL } from '../constants/user_address-constants';
import { UserAddressCreateRequestAddressTypeEnum } from '../types/user_address-type';
import type { UserAddressResponse, UserAddressCreateRequest, UserAddressUpdateRequest } from '../types/user_address-type';
import { ghnApi } from '../api/ghn-api';
import { ensureArray } from '@/shared/lib/ensure-array';

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

// Helper trích xuất thuộc tính linh hoạt theo định dạng DTO backend
const getProvinceId = (p: any): number => Number(p?.provinceId ?? p?.ProvinceID ?? p?.ProvinceId ?? p?.id);
const getProvinceName = (p: any): string => String(p?.provinceName ?? p?.ProvinceName ?? p?.name ?? '');

const getDistrictId = (d: any): number => Number(d?.districtId ?? d?.DistrictID ?? d?.DistrictId ?? d?.id);
const getDistrictName = (d: any): string => String(d?.districtName ?? d?.DistrictName ?? d?.name ?? '');

const getWardCode = (w: any): string => String(w?.wardCode ?? w?.WardCode ?? w?.wardId ?? w?.code ?? w?.id ?? '');
const getWardName = (w: any): string => String(w?.wardName ?? w?.WardName ?? w?.name ?? '');

export const UserAddressFormModal: React.FC<UserAddressFormModalProps> = ({
  open, editing, submitting, onSubmit, onClose,
}) => {
  const [form] = Form.useForm();

  // State lưu danh sách địa giới từ GHN API
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Tải danh sách Tỉnh/Thành từ API backend: GET /api/addresses/provinces
  useEffect(() => {
    if (open) {
      setLoadingProvinces(true);
      ghnApi.getProvinces()
        .then((list) => {
          const arr = ensureArray(list);
          setProvinces(arr);
        })
        .catch((err) => console.warn('Lỗi lấy Tỉnh/Thành từ API:', err))
        .finally(() => setLoadingProvinces(false));
    }
  }, [open]);

  // Set dữ liệu ban đầu khi mở Form / Sửa
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

        // Nếu có provinceId -> load danh sách Quận/Huyện
        if (editing.provinceId) {
          fetchDistricts(Number(editing.provinceId));
        }
        // Nếu có districtId -> load danh sách Phường/Xã
        if (editing.districtId) {
          fetchWards(Number(editing.districtId));
        }
      } else {
        form.resetFields();
        setDistricts([]);
        setWards([]);
        form.setFieldsValue({ addressType: UserAddressCreateRequestAddressTypeEnum.Home, isDefault: false });
      }
    }
  }, [open, editing, form]);

  // Load Quận/Huyện theo ProvinceID: GET /api/addresses/districts?provinceId=...
  const fetchDistricts = (provinceId: number) => {
    if (!provinceId) return;
    setLoadingDistricts(true);
    ghnApi.getDistricts(provinceId)
      .then((list) => {
        const arr = ensureArray(list);
        setDistricts(arr);
      })
      .catch((err) => console.warn('Lỗi lấy Quận/Huyện từ API:', err))
      .finally(() => setLoadingDistricts(false));
  };

  // Load Phường/Xã theo DistrictID: GET /api/addresses/wards?districtId=...
  const fetchWards = (districtId: number) => {
    if (!districtId) return;
    setLoadingWards(true);
    ghnApi.getWards(districtId)
      .then((list) => {
        const arr = ensureArray(list);
        setWards(arr);
      })
      .catch((err) => console.warn('Lỗi lấy Phường/Xã từ API:', err))
      .finally(() => setLoadingWards(false));
  };

  // Khi người dùng chọn Tỉnh / Thành phố
  const handleProvinceChange = (provinceId: number) => {
    const selected = provinces.find((p) => getProvinceId(p) === Number(provinceId));
    const provinceName = selected ? getProvinceName(selected) : '';

    form.setFieldsValue({
      provinceId: Number(provinceId),
      provinceName,
      districtId: undefined,
      districtName: undefined,
      wardId: undefined,
      wardName: undefined,
    });
    setDistricts([]);
    setWards([]);

    if (provinceId) {
      fetchDistricts(Number(provinceId));
    }
  };

  // Khi người dùng chọn Quận / Huyện
  const handleDistrictChange = (districtId: number) => {
    const selected = districts.find((d) => getDistrictId(d) === Number(districtId));
    const districtName = selected ? getDistrictName(selected) : '';

    form.setFieldsValue({
      districtId: Number(districtId),
      districtName,
      wardId: undefined,
      wardName: undefined,
    });
    setWards([]);

    if (districtId) {
      fetchWards(Number(districtId));
    }
  };

  // Khi người dùng chọn Phường / Xã
  const handleWardChange = (wardId: string) => {
    const selected = wards.find((w) => getWardCode(w) === String(wardId));
    const wardName = selected ? getWardName(selected) : '';

    form.setFieldsValue({
      wardId: String(wardId),
      wardName,
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={580}
      title={
        <span className="font-bold text-base text-slate-800">
          {editing ? 'Chỉnh sửa địa chỉ giao hàng' : 'Thêm địa chỉ giao hàng mới'}
        </span>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>Hủy</Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleOk}
          style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)', border: 'none', fontWeight: 600, color: '#fff' }}
        >
          {editing ? 'Lưu thay đổi' : 'Tạo mới'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="pt-2">
        {/* Trường ngầm lưu ID và Tên cho Backend */}
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.PROVINCE_ID} hidden rules={[{ required: true, message: 'Bắt buộc chọn Tỉnh/Thành!' }]}><Input /></Form.Item>
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.PROVINCE_NAME} hidden rules={[{ required: true, message: 'Bắt buộc chọn Tỉnh/Thành!' }]}><Input /></Form.Item>
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.DISTRICT_ID} hidden rules={[{ required: true, message: 'Bắt buộc chọn Quận/Huyện!' }]}><Input /></Form.Item>
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.DISTRICT_NAME} hidden rules={[{ required: true, message: 'Bắt buộc chọn Quận/Huyện!' }]}><Input /></Form.Item>
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.WARD_ID} hidden rules={[{ required: true, message: 'Bắt buộc chọn Phường/Xã!' }]}><Input /></Form.Item>
        <Form.Item name={USER_ADDRESS_FORM_FIELDS.WARD_NAME} hidden rules={[{ required: true, message: 'Bắt buộc chọn Phường/Xã!' }]}><Input /></Form.Item>

        {/* 3 DROPDOWN LIÊN HOÀN CHUẨN API PROVINCES / DISTRICTS / WARDS */}
        <div className="grid grid-cols-3 gap-3">
          <Form.Item label="Tỉnh / Thành phố" required className="mb-3">
            <Select
              placeholder="Chọn Tỉnh/Thành"
              loading={loadingProvinces}
              value={form.getFieldValue(USER_ADDRESS_FORM_FIELDS.PROVINCE_ID)}
              onChange={handleProvinceChange}
              showSearch
              optionFilterProp="label"
              options={provinces.map((p) => ({
                value: getProvinceId(p),
                label: getProvinceName(p) || `Tỉnh/Thành ${getProvinceId(p)}`,
              }))}
            />
          </Form.Item>

          <Form.Item label="Quận / Huyện" required className="mb-3">
            <Select
              placeholder="Chọn Quận/Huyện"
              loading={loadingDistricts}
              disabled={!form.getFieldValue(USER_ADDRESS_FORM_FIELDS.PROVINCE_ID)}
              value={form.getFieldValue(USER_ADDRESS_FORM_FIELDS.DISTRICT_ID)}
              onChange={handleDistrictChange}
              showSearch
              optionFilterProp="label"
              options={districts.map((d) => ({
                value: getDistrictId(d),
                label: getDistrictName(d) || `Quận/Huyện ${getDistrictId(d)}`,
              }))}
            />
          </Form.Item>

          <Form.Item label="Phường / Xã" required className="mb-3">
            <Select
              placeholder="Chọn Phường/Xã"
              loading={loadingWards}
              disabled={!form.getFieldValue(USER_ADDRESS_FORM_FIELDS.DISTRICT_ID)}
              value={form.getFieldValue(USER_ADDRESS_FORM_FIELDS.WARD_ID)}
              onChange={handleWardChange}
              showSearch
              optionFilterProp="label"
              options={wards.map((w) => ({
                value: getWardCode(w),
                label: getWardName(w) || `Phường/Xã ${getWardCode(w)}`,
              }))}
            />
          </Form.Item>
        </div>

        {/* ĐỊA CHỈ CHI TIẾT */}
        <Form.Item
          name={USER_ADDRESS_FORM_FIELDS.ADDRESS}
          label="Địa chỉ chi tiết (Số nhà, tên đường...)"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
          className="mb-3"
        >
          <Input.TextArea rows={2} placeholder="Ví dụ: 123 Đường Lê Lợi, Tòa nhà A..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.ADDRESS_TYPE}
            label="Loại địa chỉ"
            rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ!' }]}
            className="mb-3"
          >
            <Select options={addressTypeOptions} />
          </Form.Item>

          <Form.Item
            name={USER_ADDRESS_FORM_FIELDS.IS_DEFAULT}
            label="Địa chỉ mặc định"
            valuePropName="checked"
            className="mb-3"
          >
            <Switch checkedChildren="Mặc định" unCheckedChildren="Không" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
