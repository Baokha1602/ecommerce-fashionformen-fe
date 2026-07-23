import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen bg-[#0d0d0d]">
      <Outlet />
    </Layout>
  );
};

export default AuthLayout;

