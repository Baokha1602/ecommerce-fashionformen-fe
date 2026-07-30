import React, { useEffect, useState } from 'react';
import { Table, Button, App, Typography, Space, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchUserAddressesByUserIdThunk,
  createUserAddressThunk,
  updateUserAddressThunk,
  deleteUserAddressThunk,
} from '../store/user_address-thunk';
import { clearError } from '../store/user_address-slice';
import { UserAddressFormModal } from '../components/UserAddressFormModal';
import { ADDRESS_TYPE_LABEL, ADDRESS_TYPE_COLOR } from '../constants/user_address-constants';
import type { UserAddressResponse, UserAddressCreateRequest, UserAddressUpdateRequest } from '../types/user_address-type';
import { usersApi } from '@/features/users/api/users-api';
import type { UserResponse } from '@/features/users/types/users-type';

const { Title, Text } = Typography;

const UserAddressPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.userAddress);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserAddressResponse | null>(null);

  // State cho dropdown chọn khách hàng
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  // Load danh sách khách hàng khi mount
  useEffect(() => {
    setLoadingUsers(true);
    usersApi.getAll()
      .then((data) => setUsers(data))
      .catch(() => message.warning('Không thể tải danh sách khách hàng.'))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (error) { message.error(error); dispatch(clearError()); }
  }, [error, message, dispatch]);

  // Khi chọn khách hàng -> fetch địa chỉ
  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    const user = users.find((u) => u.id === userId) || null;
    setSelectedUser(user);
    dispatch(fetchUserAddressesByUserIdThunk(userId));
  };

  const handleOpenCreate = () => { setEditing(null); setModalOpen(true); };
  const handleOpenEdit = (record: UserAddressResponse) => { setEditing(record); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditing(null); };

  const handleSubmit = async (values: UserAddressCreateRequest | UserAddressUpdateRequest) => {
    if (editing?.id != null) {
      const result = await dispatch(updateUserAddressThunk({ id: editing.id, body: values as UserAddressUpdateRequest }));
      if (updateUserAddressThunk.fulfilled.match(result)) { message.success('Cập nhật địa chỉ thành công!'); handleCloseModal(); }
    } else {
      const createPayload: UserAddressCreateRequest = {
        ...(values as UserAddressCreateRequest),
        userId: selectedUserId || 1,
      };
      const result = await dispatch(createUserAddressThunk(createPayload));
      if (createUserAddressThunk.fulfilled.match(result)) { message.success('Tạo địa chỉ thành công!'); handleCloseModal(); }
    }
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa', content: 'Bạn có chắc muốn xóa địa chỉ này không?',
      okText: 'Xóa', okButtonProps: { danger: true }, cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteUserAddressThunk(id));
        if (deleteUserAddressThunk.fulfilled.match(result)) message.success('Xóa địa chỉ thành công!');
      },
    });
  };

  // Tạo options cho dropdown chọn khách hàng
  const userOptions = users.map((u) => ({
    value: u.id!,
    label: `${u.fullName || u.username || '—'} (${u.email || u.phone || ''})`,
    user: u,
  }));

  const columns: ColumnsType<UserAddressResponse> = [
    {
      title: 'Địa chỉ', dataIndex: 'address',
      render: (v: string, record: UserAddressResponse) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
          <div style={{ fontSize: 11, color: '#999' }}>
            {[record.wardName, record.districtName, record.provinceName].filter(Boolean).join(', ')}
          </div>
        </div>
      ),
    },
    {
      title: 'Loại địa chỉ', dataIndex: 'addressType', width: 120,
      render: (type: string) => {
        const color = ADDRESS_TYPE_COLOR[type] ?? '#888';
        const label = ADDRESS_TYPE_LABEL[type] ?? type;
        return (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 12px',
            borderRadius: 20, background: `${color}18`, border: `1.5px solid ${color}`,
            color, fontWeight: 700, fontSize: 12,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
            {label}
          </span>
        );
      },
    },
    {
      title: 'Mặc định', dataIndex: 'isDefault', width: 90, align: 'center',
      render: (v: boolean) => v
        ? <span style={{ color: '#c5a880', fontWeight: 700, fontSize: 12 }}>✓ Mặc định</span>
        : <Text type="secondary" style={{ fontSize: 12 }}>—</Text>,
    },
    {
      title: 'Thao tác', align: 'center', width: 100,
      render: (_: unknown, record: UserAddressResponse) => (
        <Space size={4}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleOpenEdit(record)} style={{ color: '#c5a880' }} title="Chỉnh sửa" />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} title="Xóa" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #c5a88025 0%, #d4af3725 100%)',
            border: '1.5px solid #c5a88040',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <EnvironmentOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>Địa chỉ người dùng</Title>
            <Text type="secondary" style={{ fontSize: 12 }}>Quản lý địa chỉ giao hàng của khách hàng</Text>
          </div>
        </div>
        <Button
          type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}
          disabled={!selectedUserId}
          title={!selectedUserId ? 'Vui lòng chọn khách hàng trước' : 'Thêm địa chỉ'}
          style={{
            background: selectedUserId ? 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' : undefined,
            border: 'none', borderRadius: 8, fontWeight: 600,
            boxShadow: selectedUserId ? '0 4px 12px rgba(197,168,128,0.35)' : undefined, color: '#fff',
          }}
        >
          Thêm địa chỉ
        </Button>
      </div>

      {/* Search/Select khách hàng */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            <UserOutlined style={{ marginRight: 6, color: '#c5a880' }} />
            Chọn khách hàng để xem và quản lý địa chỉ
          </Text>
        </div>
        <Select
          showSearch
          placeholder="Tìm khách hàng theo tên, email..."
          style={{ width: '100%', maxWidth: 420 }}
          loading={loadingUsers}
          filterOption={(input, option) =>
            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
          }
          options={userOptions}
          onChange={handleSelectUser}
          value={selectedUserId}
          allowClear
          onClear={() => { setSelectedUserId(null); setSelectedUser(null); }}
          optionRender={(option) => {
            const u = users.find((usr) => usr.id === option.value);
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c5a880, #d4af37)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {(u?.fullName || u?.username || '?')[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{u?.fullName || u?.username}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>{u?.email} {u?.phone ? `• ${u.phone}` : ''}</div>
                </div>
              </div>
            );
          }}
        />
        {selectedUser && (
          <div style={{
            marginTop: 10, padding: '8px 14px',
            background: '#c5a88010', border: '1.5px solid #c5a88030',
            borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <UserOutlined style={{ color: '#c5a880' }} />
            <Text style={{ fontSize: 13, color: '#c5a880', fontWeight: 600 }}>
              Đang xem: {selectedUser.fullName || selectedUser.username}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              ({list.length} địa chỉ)
            </Text>
          </div>
        )}
      </div>

      {!selectedUserId ? (
        <div style={{
          padding: '48px 24px', textAlign: 'center',
          background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
        }}>
          <EnvironmentOutlined style={{ fontSize: 40, color: '#c5a88050', marginBottom: 16 }} />
          <div style={{ fontSize: 15, color: '#888', fontWeight: 500 }}>Vui lòng chọn khách hàng để xem danh sách địa chỉ</div>
        </div>
      ) : (
        <Table
          rowKey="id" columns={columns} dataSource={Array.isArray(list) ? list : []} loading={loading}
          size="middle" bordered={false}
          pagination={Array.isArray(list) && list.length > 10 ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] } : false}
          style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
          rowClassName="hover:bg-[#fafafa] transition-colors"
          locale={{ emptyText: <div style={{ padding: '32px', color: '#999' }}>Khách hàng này chưa có địa chỉ nào</div> }}
        />
      )}

      <UserAddressFormModal open={modalOpen} editing={editing} submitting={submitting} onSubmit={handleSubmit} onClose={handleCloseModal} />
    </div>
  );
};

export default UserAddressPage;
