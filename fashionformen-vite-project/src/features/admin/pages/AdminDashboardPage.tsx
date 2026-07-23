import React from 'react';
import {
  Card,
  Table,
  Tag,
  Badge,
  Typography,
  Space,
  Progress,
  Statistic,
  Row,
  Col,
  Button,
  Avatar,
  Select,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingOutlined,
  TeamOutlined,
  InboxOutlined,
  WarningOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

// ── Dummy Data ────────────────────────────────────────────────
const STATS = [
  {
    key: 'revenue',
    label: 'Doanh thu tháng này',
    value: 48750000,
    prefix: '',
    suffix: '₫',
    trend: 12.5,
    trendUp: true,
    icon: '💰',
    color: '#c5a880',
    bg: 'from-amber-50 to-orange-50',
  },
  {
    key: 'orders',
    label: 'Đơn hàng mới',
    value: 284,
    suffix: ' đơn',
    trend: 8.2,
    trendUp: true,
    icon: '📦',
    color: '#1677ff',
    bg: 'from-blue-50 to-indigo-50',
  },
  {
    key: 'customers',
    label: 'Khách hàng mới',
    value: 63,
    suffix: ' người',
    trend: 3.1,
    trendUp: false,
    icon: '👥',
    color: '#52c41a',
    bg: 'from-green-50 to-emerald-50',
  },
  {
    key: 'lowstock',
    label: 'Sản phẩm sắp hết',
    value: 7,
    suffix: ' SKU',
    trend: null,
    trendUp: false,
    icon: '⚠️',
    color: '#ff4d4f',
    bg: 'from-red-50 to-rose-50',
  },
];

interface OrderRow {
  key: string;
  orderCode: string;
  customer: string;
  avatar: string;
  date: string;
  amount: number;
  status: string;
  payment: string;
}

const RECENT_ORDERS: OrderRow[] = [
  { key: '1', orderCode: '#ORD-20260722-001', customer: 'Nguyễn Văn An', avatar: 'https://i.pravatar.cc/32?img=1', date: '22/07/2026 09:14', amount: 765000, status: 'PENDING', payment: 'COD' },
  { key: '2', orderCode: '#ORD-20260722-002', customer: 'Trần Minh Phú', avatar: 'https://i.pravatar.cc/32?img=5', date: '22/07/2026 10:30', amount: 382500, status: 'PROCESSING', payment: 'MOMO' },
  { key: '3', orderCode: '#ORD-20260722-003', customer: 'Lê Thị Hương', avatar: 'https://i.pravatar.cc/32?img=9', date: '22/07/2026 11:05', amount: 1250000, status: 'DELIVERING', payment: 'VN_PAY' },
  { key: '4', orderCode: '#ORD-20260721-018', customer: 'Phạm Đức Hoàng', avatar: 'https://i.pravatar.cc/32?img=3', date: '21/07/2026 16:40', amount: 900000, status: 'DELIVERED', payment: 'COD' },
  { key: '5', orderCode: '#ORD-20260721-015', customer: 'Đinh Thế Long', avatar: 'https://i.pravatar.cc/32?img=7', date: '21/07/2026 14:22', amount: 450000, status: 'CANCELLED', payment: 'MOMO' },
];

const STATUS_CONFIG: Record<string, { color: string; text: string; badge: 'success' | 'processing' | 'warning' | 'error' | 'default' }> = {
  PENDING: { color: 'orange', text: 'Chờ xác nhận', badge: 'warning' },
  PROCESSING: { color: 'blue', text: 'Đang xử lý', badge: 'processing' },
  DELIVERING: { color: 'purple', text: 'Đang giao hàng', badge: 'processing' },
  DELIVERED: { color: 'green', text: 'Đã giao', badge: 'success' },
  CANCELLED: { color: 'red', text: 'Đã hủy', badge: 'error' },
};

const PAYMENT_CONFIG: Record<string, { color: string; text: string }> = {
  COD: { color: 'default', text: 'COD' },
  MOMO: { color: 'magenta', text: 'MoMo' },
  VN_PAY: { color: 'blue', text: 'VNPay' },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const ORDER_COLUMNS: ColumnsType<OrderRow> = [
  {
    title: 'Mã đơn',
    dataIndex: 'orderCode',
    key: 'orderCode',
    render: (code: string) => (
      <Text className="font-mono text-xs font-semibold text-slate-700">{code}</Text>
    ),
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customer',
    key: 'customer',
    render: (name: string, record: OrderRow) => (
      <div className="flex items-center gap-2">
        <Avatar src={record.avatar} size={28} />
        <Text className="text-sm font-medium">{name}</Text>
      </div>
    ),
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => <Text className="text-xs text-gray-500">{date}</Text>,
  },
  {
    title: 'Giá trị',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => (
      <Text className="font-bold text-[#c5a880]">{formatPrice(amount)}</Text>
    ),
    align: 'right',
  },
  {
    title: 'Thanh toán',
    dataIndex: 'payment',
    key: 'payment',
    render: (payment: string) => {
      const cfg = PAYMENT_CONFIG[payment];
      return <Tag color={cfg?.color}>{cfg?.text || payment}</Tag>;
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const cfg = STATUS_CONFIG[status];
      return (
        <Badge status={cfg?.badge || 'default'} text={
          <Tag color={cfg?.color} className="!rounded-lg">
            {cfg?.text || status}
          </Tag>
        } />
      );
    },
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Button type="text" icon={<EyeOutlined />} size="small" className="text-gray-400 hover:text-[#c5a880]">
        Chi tiết
      </Button>
    ),
    align: 'center',
    width: 90,
  },
];

// ── Low Stock Items ────────────────────────────────────────────
const LOW_STOCK = [
  { sku: 'POLO-WHITE-XL', name: 'Áo Polo Trắng / XL', qty: 3, maxQty: 50 },
  { sku: 'BLAZER-NAVY-L', name: 'Áo Blazer Navy / L', qty: 5, maxQty: 30 },
  { sku: 'DENIM-BLACK-S', name: 'Áo Denim Đen / S', qty: 2, maxQty: 40 },
  { sku: 'TROUSER-GRAY-M', name: 'Quần Tây Xám / M', qty: 7, maxQty: 60 },
];

// ── Main Component ─────────────────────────────────────────────
const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} className="!mb-1">
            Dashboard tổng quan 📊
          </Title>
          <Text className="text-gray-400 text-sm">
            Cập nhật lúc 22/07/2026 — 22:30 ICT
          </Text>
        </div>
        <Space>
          <Select
            defaultValue="thisMonth"
            size="middle"
            style={{ width: 140, borderRadius: 8 }}
            options={[
              { value: 'today', label: 'Hôm nay' },
              { value: 'thisWeek', label: 'Tuần này' },
              { value: 'thisMonth', label: 'Tháng này' },
              { value: 'thisYear', label: 'Năm nay' },
            ]}
          />
          <Button icon={<ReloadOutlined />} className="!rounded-lg">
            Làm mới
          </Button>
        </Space>
      </div>

      {/* ── STATS CARDS ──────────────────────────────────── */}
      <Row gutter={[16, 16]}>
        {STATS.map((stat) => (
          <Col key={stat.key} xs={24} sm={12} xl={6}>
            <Card
              className={`!rounded-2xl border-0 bg-gradient-to-br ${stat.bg} overflow-hidden`}
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              bodyStyle={{ padding: '20px 24px' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    {stat.label}
                  </Text>
                  <Statistic
                    value={stat.value}
                    valueStyle={{
                      color: stat.color,
                      fontSize: 26,
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}
                    suffix={<span className="text-base font-bold">{stat.suffix}</span>}
                    formatter={(val) =>
                      stat.key === 'revenue'
                        ? new Intl.NumberFormat('vi-VN').format(Number(val))
                        : val
                    }
                  />
                  {stat.trend !== null && (
                    <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                      {stat.trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {stat.trend}% so với tháng trước
                    </div>
                  )}
                  {stat.key === 'lowstock' && (
                    <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-red-500">
                      <WarningOutlined /> Cần nhập kho ngay
                    </div>
                  )}
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${stat.color}18` }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ── CONTENT ROW ──────────────────────────────────── */}
      <Row gutter={[16, 16]}>
        {/* Recent Orders */}
        <Col xs={24} xl={16}>
          <Card
            className="!rounded-2xl border-0"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            title={
              <div className="flex items-center gap-2">
                <ShoppingOutlined className="text-[#c5a880]" />
                <span className="font-bold">Đơn hàng gần đây</span>
              </div>
            }
            extra={
              <Button type="link" className="!text-[#c5a880] !font-semibold">
                Xem tất cả →
              </Button>
            }
          >
            <Table
              columns={ORDER_COLUMNS}
              dataSource={RECENT_ORDERS}
              pagination={false}
              size="middle"
              rowKey="key"
              className="rounded-xl overflow-hidden"
            />
          </Card>
        </Col>

        {/* Low Stock Alert */}
        <Col xs={24} xl={8}>
          <Card
            className="!rounded-2xl border-0 h-full"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            title={
              <div className="flex items-center gap-2">
                <InboxOutlined className="text-red-500" />
                <span className="font-bold text-red-500">Sắp hết hàng</span>
                <Tag color="red" className="!rounded-full">{LOW_STOCK.length}</Tag>
              </div>
            }
            extra={
              <Button type="link" size="small" className="!text-[#c5a880] !font-semibold">
                Quản lý kho →
              </Button>
            }
          >
            <div className="space-y-4">
              {LOW_STOCK.map((item) => (
                <div key={item.sku}>
                  <div className="flex justify-between items-center mb-1.5">
                    <Text className="text-sm font-medium text-slate-700 truncate max-w-[70%]">
                      {item.name}
                    </Text>
                    <Text
                      className={`text-xs font-bold ${
                        item.qty <= 3 ? 'text-red-500' : 'text-orange-500'
                      }`}
                    >
                      còn {item.qty}
                    </Text>
                  </div>
                  <Progress
                    percent={Math.round((item.qty / item.maxQty) * 100)}
                    showInfo={false}
                    strokeColor={item.qty <= 3 ? '#ff4d4f' : '#faad14'}
                    trailColor="#f5f5f5"
                    size="small"
                    strokeLinecap="round"
                  />
                  <Text className="text-[10px] text-gray-400">SKU: {item.sku}</Text>
                </div>
              ))}
              <Button
                block
                className="!rounded-xl !mt-2 !border-dashed !border-orange-300 !text-orange-500 hover:!bg-orange-50"
                icon={<InboxOutlined />}
              >
                Tạo phiếu nhập kho
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ── ORDER STATUS SUMMARY ─────────────────────────── */}
      <Card
        className="!rounded-2xl border-0"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        title={
          <div className="flex items-center gap-2">
            <TeamOutlined className="text-[#c5a880]" />
            <span className="font-bold">Phân bổ trạng thái đơn hàng</span>
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const counts: Record<string, number> = {
              PENDING: 45, PROCESSING: 28, DELIVERING: 67, DELIVERED: 132, CANCELLED: 12,
            };
            const total = Object.values(counts).reduce((a, b) => a + b, 0);
            const pct = Math.round((counts[key] / total) * 100);
            return (
              <Col key={key} xs={12} sm={8} md={24 / 5}>
                <div className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-2xl font-black text-slate-800">{counts[key]}</div>
                  <Tag color={cfg.color} className="!rounded-full !mt-1 !text-xs">
                    {cfg.text}
                  </Tag>
                  <div className="text-xs text-gray-400 mt-1">{pct}% tổng đơn</div>
                  <Progress percent={pct} showInfo={false} size="small" strokeColor={cfg.badge === 'success' ? '#52c41a' : cfg.badge === 'error' ? '#ff4d4f' : '#1677ff'} className="!mt-2" />
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
