import React from 'react';
import { Form, Input, Button, Checkbox, App } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { loginThunk } from '../store/auth-thunk';
import { LOGIN_FORM_FIELDS } from '../constants/login-form-fields';
import loginBanner from '@/assets/images/men_fashion_login.png';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { message } = App.useApp();

  const onFinish = async (values: any) => {
    try {
      const resultAction = await dispatch(loginThunk(values));
      if (loginThunk.fulfilled.match(resultAction)) {
        message.success('Đăng nhập thành công!');
        navigate('/');
      } else {
        message.error(resultAction.payload as string);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0d0d0d] text-white overflow-hidden">
      {/* LEFT SIDE - HERO IMAGE (Hidden on mobile) */}
      <div className="relative hidden w-3/5 lg:block h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <img
          src={loginBanner}
          alt="Fashion For Men"
          className="h-full w-full object-cover object-top transition-transform duration-10000 hover:scale-105"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12">
          <div /> {/* Spacer replacing Logo */}

          {/* Slogan */}
          <div className="max-w-md space-y-4">
            <h2 className="font-sans text-4xl font-light tracking-wide leading-snug">
              ĐỊNH HÌNH <br />
              <span className="font-extrabold text-[#c5a880]">PHONG CÁCH QUÝ ÔNG</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Khám phá không gian mua sắm thời trang nam cao cấp độc quyền. Thiết kế tinh tế nâng tầm vị thế của bạn.
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 font-light">
            © 2026 Fashion For Men.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-2/5 md:px-16 bg-[#121212] border-l border-white/5 h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight font-sans">Đăng Nhập</h2>
            <p className="text-gray-400 text-sm">
              Chào mừng quay trở lại. Vui lòng điền thông tin đăng nhập của bạn.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-400 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <Form
            name="login"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-4"
          >
            <Form.Item
              name={LOGIN_FORM_FIELDS.USERNAME}
              label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Tài khoản</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tài khoản của bạn!' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-500 mr-2" />}
                placeholder="Nhập tên tài khoản"
                className="h-12 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
              />
            </Form.Item>

            <Form.Item
              name={LOGIN_FORM_FIELDS.PASSWORD}
              label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Mật khẩu</span>}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-500 mr-2" />}
                placeholder="••••••••"
                className="h-12 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
              />
            </Form.Item>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: '#ffffff' }} className="text-xs font-medium">
                  Ghi nhớ đăng nhập
                </Checkbox>
              </Form.Item>
              <a href="#" className="text-xs font-semibold text-[#c5a880] hover:text-[#d4af37] transition-all">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <Form.Item className="pt-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-[#c5a880] hover:bg-[#d4af37] border-none text-[#0d0d0d] font-bold text-sm tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                Đăng Nhập <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center text-xs text-gray-400 pt-4">
            Chưa có tài khoản?{' '}
            <Link to="/auth/register" className="font-semibold text-[#c5a880] hover:text-[#d4af37] transition-all">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
