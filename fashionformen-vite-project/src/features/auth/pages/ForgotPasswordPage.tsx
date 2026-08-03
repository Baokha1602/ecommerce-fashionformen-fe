import React, { useState, useRef } from 'react';
import { Form, Input, Button, Steps, App } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSendOtpMutation, useVerifyOtpMutation, useResetPasswordMutation } from '../api/otp-api';
import loginBanner from '@/assets/images/men_fashion_login.png';

// ─── Hằng số ────────────────────────────────────────────────────────────────
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // giây

// ─── Sub-component: OTP Input 6 ô ──────────────────────────────────────────
interface OtpInputProps {
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

const OtpBoxInput: React.FC<OtpInputProps> = ({ value = '', onChange, disabled }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, ch: string) => {
    const digit = ch.replace(/\D/g, '').slice(-1);
    const arr = value.split('');
    arr[idx] = digit;
    const next = arr.join('').padEnd(OTP_LENGTH, ' ').trimEnd();
    onChange?.(next.trimEnd());
    if (digit && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const arr = value.split('');
      if (arr[idx]) {
        arr[idx] = '';
        onChange?.(arr.join(''));
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange?.(pasted);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIdx]?.focus();
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => { inputsRef.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value[idx] || ''}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          style={{
            width: 48,
            height: 56,
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 700,
            background: 'rgba(255,255,255,0.06)',
            border: `2px solid ${value[idx] ? '#c5a880' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 10,
            color: '#fff',
            outline: 'none',
            caretColor: '#c5a880',
            transition: 'border-color .2s',
          }}
        />
      ))}
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
type Step = 'send' | 'verify' | 'reset' | 'done';

const ForgotPasswordPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('send');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [sendForm] = Form.useForm();
  const [resetForm] = Form.useForm();

  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  // ── Đếm ngược resend ──────────────────────────────────────────────────────
  const startCountdown = () => {
    setCountdown(RESEND_COOLDOWN);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Bước 1: Gửi OTP ───────────────────────────────────────────────────────
  const handleSendOtp = async (values: { email: string }) => {
    try {
      await sendOtp({ email: values.email }).unwrap();
      setEmail(values.email);
      setStep('verify');
      startCountdown();
      message.success('Mã OTP đã được gửi đến email của bạn!');
    } catch (err: any) {
      message.error(err?.message || 'Gửi OTP thất bại. Vui lòng kiểm tra lại email.');
    }
  };

  // ── Gửi lại OTP ───────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await sendOtp({ email }).unwrap();
      setOtpCode('');
      startCountdown();
      message.success('Đã gửi lại mã OTP!');
    } catch (err: any) {
      message.error(err?.message || 'Gửi lại OTP thất bại.');
    }
  };

  // ── Bước 2: Xác minh OTP ─────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    if (otpCode.length < OTP_LENGTH) {
      message.warning('Vui lòng nhập đầy đủ 6 chữ số OTP!');
      return;
    }
    try {
      await verifyOtp({ email, otpCode }).unwrap();
      setStep('reset');
      message.success('Xác minh OTP thành công!');
    } catch (err: any) {
      message.error(err?.message || 'Mã OTP không đúng hoặc đã hết hạn.');
    }
  };

  // ── Bước 3: Đặt lại mật khẩu ─────────────────────────────────────────────
  const handleResetPassword = async (values: { newPassword: string; confirmPassword: string }) => {
    try {
      await resetPassword({
        email,
        otpCode,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).unwrap();
      setStep('done');
    } catch (err: any) {
      message.error(err?.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
    }
  };

  // ── Step indicator index ───────────────────────────────────────────────────
  const stepIndex = { send: 0, verify: 1, reset: 2, done: 2 }[step];

  return (
    <div className="flex h-screen w-full bg-[#0d0d0d] text-white overflow-hidden">
      {/* LEFT: Hero Image */}
      <div className="relative hidden w-3/5 lg:block h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <img
          src={loginBanner}
          alt="Fashion For Men"
          className="h-full w-full object-cover object-top transition-transform duration-[10000ms] hover:scale-105"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12">
          <div />
          <div className="max-w-md space-y-4">
            <h2 className="font-sans text-4xl font-light tracking-wide leading-snug">
              KHÔI PHỤC <br />
              <span className="font-extrabold text-[#c5a880]">TÀI KHOẢN CỦA BẠN</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nhập email đã đăng ký để nhận mã xác minh và thiết lập mật khẩu mới an toàn.
            </p>
          </div>
          <p className="text-xs text-gray-500 font-light">© 2026 Fashion For Men.</p>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-2/5 md:px-16 bg-[#121212] border-l border-white/5 h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-md space-y-8">

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight font-sans">Quên Mật Khẩu</h2>
            <p className="text-gray-400 text-sm">
              Chúng tôi sẽ gửi mã OTP đến email của bạn để xác minh danh tính.
            </p>
          </div>

          {/* Steps */}
          {step !== 'done' && (
            <Steps
              current={stepIndex}
              size="small"
              items={[
                { title: <span className="text-xs text-gray-400">Email</span> },
                { title: <span className="text-xs text-gray-400">Xác minh</span> },
                { title: <span className="text-xs text-gray-400">Mật khẩu</span> },
              ]}
              style={{ '--steps-color': '#c5a880' } as React.CSSProperties}
            />
          )}

          {/* ── STEP 1: Nhập Email ─────────────────────────────────────────── */}
          {step === 'send' && (
            <Form
              form={sendForm}
              name="forgot-send"
              layout="vertical"
              requiredMark={false}
              onFinish={handleSendOtp}
            >
              <Form.Item
                name="email"
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Địa chỉ Email</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-500 mr-2" />}
                  placeholder="example@gmail.com"
                  className="h-12 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all"
                />
              </Form.Item>

              <Form.Item className="pt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSending}
                  id="btn-send-otp"
                  className="w-full h-12 border-none text-[#0d0d0d] font-bold text-sm tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
                >
                  Gửi Mã OTP <ArrowRightOutlined />
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* ── STEP 2: Nhập OTP ───────────────────────────────────────────── */}
          {step === 'verify' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-400">Mã OTP đã được gửi đến</p>
                <p className="text-[#c5a880] font-semibold">{email}</p>
              </div>

              {/* OTP boxes */}
              <OtpBoxInput
                value={otpCode}
                onChange={setOtpCode}
                disabled={isVerifying}
              />

              {/* Resend */}
              <div className="text-center text-xs text-gray-400">
                {countdown > 0 ? (
                  <span>
                    Gửi lại sau{' '}
                    <span className="text-[#c5a880] font-semibold">{countdown}s</span>
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={isSending}
                    className="text-[#c5a880] hover:text-[#d4af37] font-semibold cursor-pointer transition-colors underline-offset-2 hover:underline bg-transparent border-none"
                  >
                    {isSending ? 'Đang gửi...' : 'Gửi lại mã OTP'}
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  id="btn-back-to-email"
                  onClick={() => setStep('send')}
                  className="h-12 flex-1 bg-white/5 border-white/10 text-gray-300 hover:border-[#c5a880] hover:text-[#c5a880] rounded-lg transition-all"
                  icon={<ArrowLeftOutlined />}
                >
                  Quay lại
                </Button>
                <Button
                  type="primary"
                  id="btn-verify-otp"
                  loading={isVerifying}
                  onClick={handleVerifyOtp}
                  disabled={otpCode.length < OTP_LENGTH}
                  className="h-12 flex-[2] border-none text-[#0d0d0d] font-bold tracking-widest uppercase rounded-lg transition-all hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
                >
                  Xác Minh <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Đặt mật khẩu mới ──────────────────────────────────── */}
          {step === 'reset' && (
            <Form
              form={resetForm}
              name="forgot-reset"
              layout="vertical"
              requiredMark={false}
              onFinish={handleResetPassword}
            >
              <Form.Item
                name="newPassword"
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Mật khẩu mới</span>}
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                  { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500 mr-2" />}
                  placeholder="Tối thiểu 8 ký tự"
                  className="h-12 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={<span className="text-gray-300 text-xs font-semibold tracking-wider uppercase">Xác nhận mật khẩu</span>}
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500 mr-2" />}
                  placeholder="Nhập lại mật khẩu"
                  className="h-12 bg-white/5 border-white/10 hover:border-[#c5a880] focus:border-[#c5a880] text-white rounded-lg transition-all"
                />
              </Form.Item>

              <Form.Item className="pt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  id="btn-reset-password"
                  loading={isResetting}
                  className="w-full h-12 border-none text-[#0d0d0d] font-bold text-sm tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
                >
                  Đặt Lại Mật Khẩu <ArrowRightOutlined />
                </Button>
              </Form.Item>
            </Form>
          )}

          {/* ── DONE: Hoàn thành ────────────────────────────────────────────── */}
          {step === 'done' && (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center">
                <CheckCircleFilled
                  style={{
                    fontSize: 72,
                    color: '#c5a880',
                    filter: 'drop-shadow(0 0 18px rgba(197,168,128,0.5))',
                  }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Thành Công!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mật khẩu của bạn đã được cập nhật. <br />
                  Vui lòng đăng nhập lại với mật khẩu mới.
                </p>
              </div>
              <Button
                type="primary"
                id="btn-go-login"
                onClick={() => navigate('/auth/login')}
                className="h-12 px-10 border-none text-[#0d0d0d] font-bold text-sm tracking-widest uppercase rounded-lg transition-all hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)' }}
              >
                Đăng Nhập Ngay
              </Button>
            </div>
          )}

          {/* Back to login link */}
          {step !== 'done' && (
            <div className="text-center text-xs text-gray-400 pt-2">
              Nhớ mật khẩu rồi?{' '}
              <Link
                to="/auth/login"
                className="font-semibold text-[#c5a880] hover:text-[#d4af37] transition-all"
              >
                Đăng nhập
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
