import React, { useEffect, useState } from 'react';
import { Table, Button, App, Typography, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
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

const { Title, Text } = Typography;

const UserAddressPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { list, loading, submitting, error } = useAppSelector((state) => state.userAddress);
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserAddressResponse | null>(null);
  const [searchUserId, setSearchUserId] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserAddressesByUserIdThunk(user.id));
      setSearchUserId(user.id.toString());
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (error) { message.error(error); dispatch(clearError()); }
  }, [error, message, dispatch]);

  const handleSearch = () => {
    const id = parseInt(searchUserId);
    if (!isNaN(id) && id > 0) {
      dispatch(fetchUserAddressesByUserIdThunk(id));
    } else {
      message.warning('Vui lòng nhập User ID hợp lệ!');
    }
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
        userId: user?.id || parseInt(searchUserId) || 1,
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

  const columns: ColumnsType<UserAddressResponse> = [
    {
      title: 'ID', dataIndex: 'id', width: 60, align: 'center',
      render: (v: number) => <Text type="secondary" className="text-xs font-mono">#{v}</Text>,
    },
    {
      title: 'User ID', dataIndex: 'userId', width: 80, align: 'center',
      render: (v: number) => <Text strong>{v}</Text>,
    },
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
          style={{
            background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
            border: 'none', borderRadius: 8, fontWeight: 600,
            boxShadow: '0 4px 12px rgba(197,168,128,0.35)', color: '#fff',
          }}
        >
          Thêm địa chỉ
        </Button>
      </div>

      {/* Search by User ID */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Input
          placeholder="Nhập User ID để tìm địa chỉ..."
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          onPressEnter={handleSearch}
          style={{ maxWidth: 280, borderRadius: 8 }}
          prefix={<EnvironmentOutlined style={{ color: '#c5a880' }} />}
        />
        <Button
          onClick={handleSearch}
          style={{ borderRadius: 8, borderColor: '#c5a880', color: '#c5a880' }}
        >
          Tìm kiếm
        </Button>
      </div>

      <Table
        rowKey="id" columns={columns} dataSource={Array.isArray(list) ? list : []} loading={loading}
        size="middle" bordered={false}
        pagination={Array.isArray(list) && list.length > 10 ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'] } : false}
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        rowClassName="hover:bg-[#fafafa] transition-colors"
      />

      <UserAddressFormModal open={modalOpen} editing={editing} submitting={submitting} onSubmit={handleSubmit} onClose={handleCloseModal} />
    </div>
  );
};

export default UserAddressPage;
