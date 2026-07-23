import React from 'react';
import { Form, Input, Button, App, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/redux/hooks';
import { REGISTER_FORM_FIELDS } from '../constants/register-form-fields';
import { authApi } from '../api/auth-api';
import loginBanner from '@/assets/images/men_fashion_login.png';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const { message } = App.useApp();

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const { username, email, fullName, phone, password, birthDay, birthMonth, birthYear } = values;

      // Combine day, month, year into YYYY-MM-DD
      const dayStr = String(birthDay).padStart(2, '0');
      const monthStr = String(birthMonth).padStart(2, '0');
      const dateOfBirth = `${birthYear}-${monthStr}-${dayStr}`;

      const payload = {
        username,
        email,
        fullName,
        phone,
        password,
        dateOfBirth
      };

      await authApi.register(payload);
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/auth/login');
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng ký.');
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
              ĐỒNG HÀNH CÙNG <br />
              <span className="font-extrabold text-[#c5a880]">SỰ PHÁT TRIỂN</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tạo tài khoản cá nhân của bạn để trải nghiệm tính năng chăm sóc đặc quyền dành riêng cho khách hàng VIP.
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 font-light">
            © 2026 Fashion For Men.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-2/5 md:px-16 bg-[#121212] border-l border-white/5 h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-lg space-y-6">
          {/* Header */}
          <div className="space-y-2">

            <h2 className="text-3xl font-bold tracking-tight font-sans">Đăng Ký Tài Khoản</h2>
            <p className="text-gray-400 text-sm">
              Khởi đầu phong cách riêng của bạn bằng cách đăng ký hôm nay.
            </p>
          </div>

          {/* Form */}
          <Form
            name="register"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <Form.Item
                name={REGISTER_FORM_FIELDS.USERNAME}
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Tên tài khoản</span>}
                rules={[
                  { required: true, message: 'Tên đăng nhập không được để trống' },
                  { min: 4, message: 'Tên đăng nhập phải từ 4 đến 50 ký tự' },
                  { max: 50, message: 'Tên đăng nhập phải từ 4 đến 50 ký tự' },
                  { pattern: /^\S+$/, message: 'Tên đăng nhập không được chứa khoảng trắng' }
                ]}
                className="mb-3"
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500 mr-2" />}
                  placeholder="username"
                  className="h-10 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
                />
              </Form.Item>

              <Form.Item
                name={REGISTER_FORM_FIELDS.FULL_NAME}
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Họ và tên</span>}
                rules={[
                  { required: true, message: 'Họ và tên không được để trống' },
                  { max: 255, message: 'Họ và tên tối đa 255 ký tự' }
                ]}
                className="mb-3"
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500 mr-2" />}
                  placeholder="Nguyễn Văn A"
                  className="h-10 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
                />
              </Form.Item>

              <Form.Item
                name={REGISTER_FORM_FIELDS.EMAIL}
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Email</span>}
                rules={[
                  { required: true, message: 'Email không được để trống' },
                  { type: 'email', message: 'Email không đúng định dạng' },
                  { max: 100, message: 'Email tối đa 100 ký tự' }
                ]}
                className="mb-3"
              >
                <Input
                  prefix={<MailOutlined className="text-gray-500 mr-2" />}
                  placeholder="yourmail@gmail.com"
                  className="h-10 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
                />
              </Form.Item>

              <Form.Item
                name={REGISTER_FORM_FIELDS.PHONE}
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Số điện thoại</span>}
                rules={[
                  { required: true, message: 'Số điện thoại không được để trống' },
                  { pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/, message: 'Số điện thoại không hợp lệ' }
                ]}
                className="mb-3"
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-500 mr-2" />}
                  placeholder="09XXXXXXXX"
                  className="h-10 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
                />
              </Form.Item>

              {/* Ngày sinh */}
              <div className="col-span-2 mb-3">
                <span className="text-gray-300 text-xs font-semibold tracking-wider uppercase block mb-2">Ngày sinh</span>
                <div className="grid grid-cols-3 gap-2">
                  <Form.Item
                    name="birthDay"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                  >
                    <Select
                      placeholder="Ngày"
                      className="bg-white/5 text-white rounded-lg transition-all"
                      style={{ height: '40px' }}
                      options={Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }))}
                      popupClassName="dark-select-dropdown"
                    />
                  </Form.Item>

                  <Form.Item
                    name="birthMonth"
                    rules={[{ required: true, message: 'Vui lòng chọn tháng!' }]}
                  >
                    <Select
                      placeholder="Tháng"
                      className="bg-white/5 text-white rounded-lg transition-all"
                      style={{ height: '40px' }}
                      options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `Tháng ${i + 1}` }))}
                      popupClassName="dark-select-dropdown"
                    />
                  </Form.Item>

                  <Form.Item
                    name="birthYear"
                    rules={[{ required: true, message: 'Vui lòng chọn năm!' }]}
                  >
                    <Select
                      placeholder="Năm"
                      className="bg-white/5 text-white rounded-lg transition-all"
                      style={{ height: '40px' }}
                      options={Array.from({ length: 80 }, (_, i) => {
                        const yr = new Date().getFullYear() - 13 - i;
                        return { value: yr, label: `${yr}` };
                      })}
                      popupClassName="dark-select-dropdown"
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                name={REGISTER_FORM_FIELDS.PASSWORD}
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Mật khẩu</span>}
                rules={[
                  { required: true, message: 'Mật khẩu không được để trống' },
                  { min: 6, message: 'Mật khẩu phải từ 6 đến 32 ký tự' },
                  { max: 32, message: 'Mật khẩu phải từ 6 đến 32 ký tự' }
                ]}
                className="mb-3"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500 mr-2" />}
                  placeholder="••••••••"
                  className="h-10 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
                />
              </Form.Item>

              <Form.Item
                name={REGISTER_FORM_FIELDS.CONFIRM_PASSWORD}
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Xác nhận mật khẩu</span>}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue(REGISTER_FORM_FIELDS.PASSWORD) === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
                className="mb-3"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500 mr-2" />}
                  placeholder="••••••••"
                  className="h-10 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all focus:bg-white/10"
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <Form.Item className="pt-2 mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-11 bg-[#c5a880] hover:bg-[#d4af37] border-none text-[#0d0d0d] font-bold text-sm tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>

          {/* Log In Link */}
          <div className="text-center text-xs text-gray-400">
            Đã có tài khoản?{' '}
            <Link to="/auth/login" className="font-semibold text-[#c5a880] hover:text-[#d4af37] transition-all">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
