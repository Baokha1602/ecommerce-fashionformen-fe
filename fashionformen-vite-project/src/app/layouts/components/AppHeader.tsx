import { Layout, Dropdown, Badge, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { logout } from '@/features/auth/store/auth-slice';
import { useTheme } from '@/app/providers/theme/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '@/shared/components/avatar/UserAvatar';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: () => dispatch(logout()),
    },
  ];

  const isDark = theme === 'dark';

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        background: isDark ? '#141414' : '#fff',
        borderBottom: `1px solid ${isDark ? '#2a2a2a' : '#f0f0f0'}`,
        color: isDark ? '#e5e5e5' : '#1a1a1a',
      }}
    >
      {/* LEFT — toggle sidebar */}
      <div
        style={{ fontSize: 20, cursor: 'pointer', color: isDark ? '#e5e5e5' : '#333' }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <Badge count={0} size="small">
          <BellOutlined style={{ fontSize: 18, cursor: 'pointer', color: isDark ? '#bbb' : '#555' }} />
        </Badge>

        {/* Theme switch — Sun = dark mode bật, Moon = light mode */}
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
        />

        {/* User dropdown */}
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div className="flex items-center gap-2 cursor-pointer">
            <UserAvatar size={40} />
            <div className="flex flex-col leading-tight">
              <span style={{ fontSize: 13, fontWeight: 600, color: isDark ? '#e5e5e5' : '#1a1a1a' }}>
                {user?.fullName || user?.email}
              </span>
              <span style={{ fontSize: 11, color: isDark ? '#888' : '#999' }}>
                {(user?.role || user?.userRole)?.toUpperCase()}
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
