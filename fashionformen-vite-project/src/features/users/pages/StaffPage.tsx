import React, { useEffect, useState, useMemo } from 'react';
import { Table, Button, App, Typography, Avatar, Space, Input, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, StopOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  fetchAllUsersThunk,
  updateUserThunk,
  toggleActiveUserThunk,
  deleteUserThunk,
} from '../store/users-thunk';
import { clearError } from '../store/users-slice';
import { USER_ROLE_LABEL, USER_ROLE_COLOR } from '../constants/users-constants';
import type { UserResponse, UserUpdateRequest } from '../types/users-type';
import { UserFormModal } from '../components/UserFormModal';

const { Title, Text } = Typography;

const StaffPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, submitting, error } = useAppSelector((state) => state.users);
  const { message, modal } = App.useApp();

  const [searchText, setSearchText] = useState('');
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, message, dispatch]);

  // Lọc danh sách theo vai trò STAFF, ADMIN và search text
  const filteredList = useMemo(() => {
    const staffAndAdmins = list.filter(
      (u) => {
        const role = (u.userRole || '').toUpperCase();
        return role === 'STAFF' || role === 'ADMIN';
      }
    );
    if (!searchText.trim()) return staffAndAdmins;
    const q = searchText.toLowerCase();
    return staffAndAdmins.filter((u) =>
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.username || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q)
    );
  }, [list, searchText]);

  const handleOpenEdit = (user: UserResponse) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmitEdit = async (values: UserUpdateRequest) => {
    if (!editingUser?.id) return;
    const result = await dispatch(updateUserThunk({ id: editingUser.id, data: values }));
    if (updateUserThunk.fulfilled.match(result)) {
      message.success('Cập nhật thông tin thành công!');
      handleCloseModal();
    }
  };

  const handleToggleActive = async (user: UserResponse) => {
    const newStatus = !user.isActive;
    const result = await dispatch(toggleActiveUserThunk({ id: user.id!, isActive: newStatus }));
    if (toggleActiveUserThunk.fulfilled.match(result)) {
      message.success(newStatus ? 'Đã khôi phục hoạt động cho tài khoản!' : 'Đã vô hiệu hóa tài khoản!');
    }
  };

  const handleDelete = (user: UserResponse) => {
    modal.confirm({
      title: 'Xác nhận xóa tài khoản nhân sự',
      content: (
        <div>
          <p>Bạn có chắc muốn xóa tài khoản <strong>{user.fullName || user.username}</strong>?</p>
          <p style={{ color: '#ff4d4f', fontSize: 12 }}>Hành động này không thể hoàn tác!</p>
        </div>
      ),
      okText: 'Xóa', okButtonProps: { danger: true }, cancelText: 'Hủy',
      onOk: async () => {
        const result = await dispatch(deleteUserThunk(user.id!));
        if (deleteUserThunk.fulfilled.match(result)) {
          message.success('Xóa tài khoản thành công!');
        }
      },
    });
  };

  const columns: ColumnsType<UserResponse> = [
    {
      title: 'Nhân viên / Admin',
      render: (_: unknown, record: UserResponse) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {record.avatarImage ? (
            <Avatar src={record.avatarImage} size={36} />
          ) : (
            <Avatar
              size={36}
              icon={<UserOutlined />}
              style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
            />
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>
              {record.fullName || record.username || '—'}
            </div>
            <div style={{ fontSize: 11, color: '#999' }}>{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (v: string) => <Text type="secondary" style={{ fontSize: 13 }}>{v || '—'}</Text>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: 130,
      render: (v: string) => (v ? <Text>{v}</Text> : <Text type="secondary">—</Text>),
    },
    {
      title: 'Vai trò',
      dataIndex: 'userRole',
      width: 130,
      render: (role: string) => {
        const roleKey = (role || '').toUpperCase();
        const color = USER_ROLE_COLOR[roleKey] ?? '#888';
        const label = USER_ROLE_LABEL[roleKey] ?? role;
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 12px',
              borderRadius: 20,
              background: `${color}18`,
              border: `1.5px solid ${color}`,
              color: color,
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
            {label}
          </span>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      width: 130,
      align: 'center',
      render: (isActive: boolean) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 12px',
            borderRadius: 20,
            background: isActive ? '#52c41a18' : '#ff4d4f18',
            border: `1.5px solid ${isActive ? '#52c41a' : '#ff4d4f'}`,
            color: isActive ? '#52c41a' : '#ff4d4f',
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: isActive ? '#52c41a' : '#ff4d4f', flexShrink: 0 }} />
          {isActive ? 'Hoạt động' : 'Bị vô hiệu hóa'}
        </span>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: 110,
      render: (v: string) => (
        v ? <Text type="secondary" className="text-xs">{new Date(v).toLocaleDateString('vi-VN')}</Text> : '—'
      ),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 130,
      render: (_: unknown, record: UserResponse) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleOpenEdit(record)}
              style={{ color: '#c5a880' }}
            />
          </Tooltip>
          <Tooltip title={record.isActive ? 'Vô hiệu hóa' : 'Khôi phục'}>
            <Popconfirm
              title={record.isActive ? 'Vô hiệu hóa tài khoản nhân sự?' : 'Khôi phục hoạt động?'}
              description={record.isActive
                ? 'Tài khoản nhân viên này sẽ tạm dừng hoạt động.'
                : 'Khôi phục trạng thái hoạt động bình thường.'}
              onConfirm={() => handleToggleActive(record)}
              okText={record.isActive ? 'Vô hiệu hóa' : 'Khôi phục'}
              cancelText="Hủy"
              okButtonProps={{ danger: record.isActive }}
            >
              <Button
                type="text"
                size="small"
                icon={record.isActive ? <StopOutlined /> : <CheckCircleOutlined />}
                style={{ color: record.isActive ? '#ff4d4f' : '#52c41a' }}
                loading={submitting}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #c5a88025 0%, #d4af3725 100%)',
              border: '1.5px solid #c5a88040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UserOutlined style={{ fontSize: 18, color: '#c5a880' }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
              Quản lý nhân sự (Staff / Admin)
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {filteredList.length} nhân viên và quản trị viên trong hệ thống
            </Text>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ marginBottom: 16 }}>
        <Input
          allowClear
          placeholder="Tìm kiếm nhân sự..."
          prefix={<SearchOutlined style={{ color: '#c5a880' }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 380, borderRadius: 8 }}
        />
        {searchText && (
          <Text type="secondary" style={{ marginLeft: 12, fontSize: 13 }}>
            Tìm thấy <strong>{filteredList.length}</strong> kết quả
          </Text>
        )}
      </div>

      {/* Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredList}
        loading={loading}
        size="middle"
        bordered={false}
        pagination={
          filteredList.length > 10
            ? { pageSize: 10, showSizeChanger: false, position: ['bottomRight'], showTotal: (total) => `Tổng ${total} nhân sự` }
            : false
        }
        style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}
        rowClassName={(record) => record.isActive === false ? 'opacity-55 bg-slate-50 grayscale-[30%] transition-opacity' : 'hover:bg-[#fafafa] transition-colors'}
      />

      {/* Modal sửa */}
      <UserFormModal
        open={modalOpen}
        editing={editingUser}
        submitting={submitting}
        onSubmit={handleSubmitEdit}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default StaffPage;
