import React, { useEffect, useState } from 'react';
import { Modal, Button, Tag, App, Spin, Empty, Space } from 'antd';
import {
  EnvironmentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchUserAddressesByUserIdThunk,
  createUserAddressThunk,
  updateUserAddressThunk,
  deleteUserAddressThunk,
} from '../store/user_address-thunk';
import { UserAddressFormModal } from './UserAddressFormModal';
import { ADDRESS_TYPE_LABEL, ADDRESS_TYPE_COLOR } from '../constants/user_address-constants';
import type { UserAddressResponse, UserAddressCreateRequest, UserAddressUpdateRequest } from '../types/user_address-type';
import { ensureArray } from '@/shared/lib/ensure-array';

interface UserAddressModalProps {
  open: boolean;
  onClose: () => void;
}

export const UserAddressModal: React.FC<UserAddressModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { list, loading, submitting } = useAppSelector((state) => state.userAddress);
  const { message, modal } = App.useApp();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddressResponse | null>(null);

  useEffect(() => {
    if (open && user?.id) {
      dispatch(fetchUserAddressesByUserIdThunk(user.id));
    }
  }, [open, user?.id, dispatch]);

  const addresses = ensureArray(list);

  const handleOpenCreate = () => {
    setEditingAddress(null);
    setFormModalOpen(true);
  };

  const handleOpenEdit = (addr: UserAddressResponse) => {
    setEditingAddress(addr);
    setFormModalOpen(true);
  };

  const handleFormSubmit = async (values: UserAddressCreateRequest | UserAddressUpdateRequest) => {
    if (editingAddress?.id != null) {
      const result = await dispatch(updateUserAddressThunk({ id: editingAddress.id, body: values as UserAddressUpdateRequest }));
      if (updateUserAddressThunk.fulfilled.match(result)) {
        message.success('Cập nhật địa chỉ thành công!');
        setFormModalOpen(false);
        if (user?.id) dispatch(fetchUserAddressesByUserIdThunk(user.id));
      }
    } else {
      const createPayload: UserAddressCreateRequest = {
        ...(values as UserAddressCreateRequest),
        userId: user?.id || 1,
      };
      const result = await dispatch(createUserAddressThunk(createPayload));
      if (createUserAddressThunk.fulfilled.match(result)) {
        message.success('Thêm địa chỉ giao hàng thành công!');
        setFormModalOpen(false);
        if (user?.id) dispatch(fetchUserAddressesByUserIdThunk(user.id));
      }
    }
  };

  const handleSetDefault = async (addr: UserAddressResponse) => {
    if (!addr.id) return;
    const result = await dispatch(updateUserAddressThunk({
      id: addr.id,
      body: { isDefault: true }
    }));
    if (updateUserAddressThunk.fulfilled.match(result)) {
      message.success('Đã đặt làm địa chỉ mặc định!');
      if (user?.id) dispatch(fetchUserAddressesByUserIdThunk(user.id));
    }
  };

  const handleDelete = (addr: UserAddressResponse) => {
    if (!addr.id) return;
    modal.confirm({
      title: 'Xóa địa chỉ giao hàng',
      content: `Bạn có chắc muốn xóa địa chỉ "${addr.address}" không?`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteUserAddressThunk(addr.id!));
        if (deleteUserAddressThunk.fulfilled.match(result)) {
          message.success('Xóa địa chỉ thành công!');
          if (user?.id) dispatch(fetchUserAddressesByUserIdThunk(user.id));
        }
      },
    });
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        width={640}
        footer={null}
        title={
          <div className="flex items-center justify-between pr-8">
            <span className="flex items-center gap-2 font-bold text-base text-slate-800">
              <EnvironmentOutlined className="text-[#c5a880]" /> Sổ địa chỉ giao hàng của tôi
            </span>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleOpenCreate}
              style={{
                background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
                border: 'none',
                fontWeight: 600,
                color: '#fff',
                borderRadius: 20,
                padding: '2px 14px'
              }}
            >
              Thêm địa chỉ mới
            </Button>
          </div>
        }
      >
        <div className="py-2">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Spin size="large" />
            </div>
          ) : addresses.length === 0 ? (
            <Empty
              description="Bạn chưa lưu địa chỉ giao hàng nào"
              className="my-8"
            >
              <Button
                type="primary"
                onClick={handleOpenCreate}
                style={{ background: '#000', border: 'none', borderRadius: 20 }}
              >
                + Thêm địa chỉ đầu tiên
              </Button>
            </Empty>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {addresses.map((addr) => {
                const color = ADDRESS_TYPE_COLOR[addr.addressType || 'HOME'] ?? '#c5a880';
                const label = ADDRESS_TYPE_LABEL[addr.addressType || 'HOME'] ?? addr.addressType;
                return (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-xl border transition-all ${
                      addr.isDefault
                        ? 'border-[#c5a880] bg-[#c5a880]/5 shadow-xs'
                        : 'border-gray-100 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Tag color={color} className="font-bold text-[11px] rounded-full px-2.5">
                            {label}
                          </Tag>
                          {addr.isDefault && (
                            <Tag color="gold" icon={<CheckCircleOutlined />} className="font-bold text-[11px] rounded-full">
                              Địa chỉ mặc định
                            </Tag>
                          )}
                        </div>

                        <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          <HomeOutlined className="text-gray-400" />
                          {addr.address}
                        </div>

                        <div className="text-xs text-gray-500">
                          {[addr.wardName, addr.districtName, addr.provinceName].filter(Boolean).join(', ')}
                        </div>
                      </div>

                      <Space size={4} className="flex-shrink-0">
                        {!addr.isDefault && (
                          <Button
                            type="text"
                            size="small"
                            className="text-xs text-[#c5a880] font-semibold hover:bg-[#c5a880]/10"
                            onClick={() => handleSetDefault(addr)}
                          >
                            Đặt làm mặc định
                          </Button>
                        )}
                        <Button
                          type="text"
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => handleOpenEdit(addr)}
                          style={{ color: '#c5a880' }}
                          title="Sửa địa chỉ"
                        />
                        <Button
                          type="text"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(addr)}
                          title="Xóa địa chỉ"
                        />
                      </Space>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>

      {/* Form modal tạo / sửa địa chỉ */}
      <UserAddressFormModal
        open={formModalOpen}
        editing={editingAddress}
        submitting={submitting}
        onSubmit={handleFormSubmit}
        onClose={() => setFormModalOpen(false)}
      />
    </>
  );
};

export default UserAddressModal;
