import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/redux/hooks';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  allowedRoles,
  redirectTo,
}) => {
  const { user, initialized } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return <Spin size="large" className="flex! items-center justify-center h-screen" />;
  }

  // 1. Route yêu cầu login nhưng chưa đăng nhập -> chuyển về login
  if (requireAuth && !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2. Route auth (login/register) nhưng ĐÃ đăng nhập -> chuyển hướng theo role
  if (!requireAuth && user) {
    const userRole = (user.role || user.userRole)?.toUpperCase();
    if (userRole === 'ADMIN' || userRole === 'STAFF') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // 3. Route có yêu cầu role cụ thể (allowedRoles)
  if (requireAuth && user && allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || user.userRole)?.toUpperCase();
    const hasRole = allowedRoles.some((r) => r.toUpperCase() === userRole);

    if (!hasRole) {
      // CUSTOMER cố vào trang quản trị -> đẩy về trang chủ storefront
      if (userRole === 'CUSTOMER') {
        return <Navigate to="/" replace />;
      }
      // STAFF cố vào trang Admin-only -> đẩy về /admin dashboard
      return <Navigate to={redirectTo || '/admin'} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

