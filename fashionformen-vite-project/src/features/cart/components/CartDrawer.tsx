import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Input,
  Divider,
  Typography,
  Empty,
  Progress,
  Space,
  InputNumber,
  message,
} from 'antd';
import {
  DeleteOutlined,
  TagOutlined,
  TruckOutlined,
  ShoppingOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  GiftOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

// ── Dummy Data ────────────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  variant: string; // 'Navy / Size M'
  price: number;
  originalPrice?: number;
  qty: number;
  image: string;
  sku: string;
}

const DUMMY_CART_ITEMS: CartItem[] = [
  {
    id: 'ci-001',
    name: 'Áo Polo SlimFit Premium Cotton',
    variant: 'Navy / Size M',
    price: 382500,
    originalPrice: 450000,
    qty: 2,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=300&auto=format&fit=crop',
    sku: 'POLO-SLIM-001',
  },
  {
    id: 'ci-002',
    name: 'Áo Sơ Mi Denim Classic Wash',
    variant: 'Indigo / Size L',
    price: 450000,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=300&auto=format&fit=crop',
    sku: 'DENIM-CW-002',
  },
];

const SUGGESTED_VOUCHERS = [
  {
    code: 'SUMMER15',
    label: 'Giảm 15%',
    sub: 'Đơn từ 500K · Tối đa 50K',
    icon: '🌞',
    type: 'PERCENTAGE',
  },
  {
    code: 'FREESHIP',
    label: 'Miễn phí ship',
    sub: 'Không giới hạn giá trị đơn',
    icon: '🚚',
    type: 'FIXED',
  },
  {
    code: 'LOYAL30K',
    label: 'Giảm 30.000đ',
    sub: 'Dành cho thành viên Gold+',
    icon: '👑',
    type: 'FIXED',
  },
];

const FREESHIP_THRESHOLD = 800000;

// ── Helpers ───────────────────────────────────────────────────
const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// ── Props ─────────────────────────────────────────────────────
interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────
const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const [items, setItems] = useState<CartItem[]>(DUMMY_CART_ITEMS);
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // ── Computed ────────────────────────────────────────────────
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= FREESHIP_THRESHOLD ? 0 : 30000;
  const discount = appliedVoucher === 'SUMMER15' ? Math.min(subtotal * 0.15, 50000) : 0;
  const total = subtotal + shipping - discount;
  const freeshipProgress = Math.min((subtotal / FREESHIP_THRESHOLD) * 100, 100);
  const amountToFreeship = FREESHIP_THRESHOLD - subtotal;

  // ── Handlers ────────────────────────────────────────────────
  const handleQtyChange = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    messageApi.info('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleApplyVoucher = (code: string) => {
    const validCodes = SUGGESTED_VOUCHERS.map((v) => v.code);
    if (validCodes.includes(code.toUpperCase())) {
      setAppliedVoucher(code.toUpperCase());
      setVoucherInput(code.toUpperCase());
      messageApi.success(`Áp dụng mã "${code.toUpperCase()}" thành công!`);
    } else {
      messageApi.error('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  return (
    <>
      {contextHolder}
      <Drawer
        open={open}
        onClose={onClose}
        placement="right"
        styles={{
          wrapper: { width: 420 },
          body: { padding: 0, display: 'flex', flexDirection: 'column', height: '100%' },
          header: { display: 'none' },
        }}
      >
        {/* ── DRAWER HEADER ──────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingOutlined className="text-xl text-[#c5a880]" />
            <Title level={5} className="!mb-0 !font-bold">
              Giỏ hàng của bạn
            </Title>
            <span className="w-6 h-6 rounded-full bg-[#c5a880] text-white text-xs font-bold flex items-center justify-center">
              {items.reduce((s, i) => s + i.qty, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <CloseOutlined className="text-gray-500" />
          </button>
        </div>

        {/* ── FREESHIP PROGRESS ──────────────────────────── */}
        {subtotal > 0 && (
          <div className="px-5 py-3 bg-amber-50 border-b border-amber-100 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <TruckOutlined className="text-amber-500" />
              <Text className="text-xs text-amber-700 font-semibold">
                {shipping === 0
                  ? '🎉 Bạn đã được MIỄN PHÍ vận chuyển!'
                  : `Mua thêm ${formatPrice(amountToFreeship)} để được FREESHIP`}
              </Text>
            </div>
            <Progress
              percent={freeshipProgress}
              showInfo={false}
              strokeColor={{ from: '#c5a880', to: '#d4af37' }}
              trailColor="#e5e7eb"
              size="small"
              strokeLinecap="round"
            />
          </div>
        )}

        {/* ── CART ITEMS ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <Empty
              image={<ShoppingOutlined style={{ fontSize: 56, color: '#e5e7eb' }} />}
              description={
                <span className="text-gray-400 text-sm">Giỏ hàng của bạn đang trống</span>
              }
              className="mt-16"
            >
              <Button
                type="primary"
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #c5a880, #d4af37)',
                  border: 'none',
                  borderRadius: 8,
                }}
              >
                Tiếp tục mua sắm
              </Button>
            </Empty>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Text
                    className="text-sm font-semibold text-slate-800 block leading-snug line-clamp-2"
                    style={{ display: '-webkit-box' } as React.CSSProperties}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-xs text-gray-400 block mt-0.5">{item.variant}</Text>

                  <div className="flex items-center justify-between mt-2">
                    {/* Price */}
                    <div>
                      <span className="text-sm font-bold text-[#c5a880]">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-1.5">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Qty + Delete */}
                    <div className="flex items-center gap-2">
                      <InputNumber
                        min={1}
                        max={99}
                        value={item.qty}
                        onChange={(val) => handleQtyChange(item.id, val || 1)}
                        size="small"
                        controls
                        style={{ width: 72, borderRadius: 6 }}
                      />
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <DeleteOutlined className="text-red-400 text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── VOUCHER + SUMMARY (bottom fixed) ───────────── */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-white flex-shrink-0">
            {/* Voucher section */}
            <div className="px-5 pt-4 pb-3">
              <div className="flex items-center gap-2 mb-3">
                <GiftOutlined className="text-[#c5a880]" />
                <Text className="text-sm font-bold text-slate-700">Mã giảm giá</Text>
              </div>

              {/* Input */}
              <Space.Compact className="w-full mb-3">
                <Input
                  placeholder="Nhập mã voucher..."
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  onPressEnter={() => handleApplyVoucher(voucherInput)}
                  prefix={<TagOutlined className="text-gray-400" />}
                  style={{ borderRadius: '8px 0 0 8px' }}
                />
                <Button
                  type="primary"
                  onClick={() => handleApplyVoucher(voucherInput)}
                  style={{
                    background: '#c5a880',
                    border: 'none',
                    borderRadius: '0 8px 8px 0',
                    fontWeight: 600,
                  }}
                >
                  Áp dụng
                </Button>
              </Space.Compact>

              {/* Suggested vouchers */}
              <div className="flex gap-2 flex-wrap">
                {SUGGESTED_VOUCHERS.map((v) => (
                  <button
                    key={v.code}
                    onClick={() => handleApplyVoucher(v.code)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:scale-105 ${
                      appliedVoucher === v.code
                        ? 'bg-[#c5a880] border-[#c5a880] text-white'
                        : 'bg-amber-50 border-amber-200 text-amber-700 hover:border-[#c5a880]'
                    }`}
                  >
                    <span>{v.icon}</span>
                    <div className="text-left">
                      <div>{v.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Divider className="!my-0" />

            {/* Price summary */}
            <div className="px-5 py-4 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tạm tính ({items.reduce((s, i) => s + i.qty, 0)} sản phẩm)</span>
                <span className="font-medium text-slate-700">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <TruckOutlined /> Phí vận chuyển
                </span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium text-slate-700'}>
                  {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 flex items-center gap-1">
                    <TagOutlined /> Giảm giá ({appliedVoucher})
                  </span>
                  <span className="text-green-600 font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <Divider className="!my-2" />

              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 text-base">Tổng cộng</span>
                <div className="text-right">
                  <div className="text-xl font-black text-[#c5a880]">{formatPrice(total)}</div>
                  <div className="text-[10px] text-gray-400">Đã bao gồm VAT</div>
                </div>
              </div>
            </div>

            {/* Checkout button */}
            <div className="px-5 pb-5">
              <Button
                type="primary"
                size="large"
                block
                icon={<ArrowRightOutlined />}
                className="!h-12 !rounded-xl !font-bold !text-white"
                style={{
                  background: 'linear-gradient(135deg, #c5a880 0%, #d4af37 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(197,168,128,0.4)',
                  fontSize: 15,
                }}
              >
                THANH TOÁN ({formatPrice(total)})
              </Button>
              <button
                onClick={onClose}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 transition-colors"
              >
                ← Tiếp tục mua sắm
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;
