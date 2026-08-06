import React, { useEffect, useMemo } from 'react';
import {
  Card, Table, Tag, Typography, Space,
  Progress, Statistic, Row, Col, Button, Avatar,
} from 'antd';
import {
  ShoppingOutlined, TeamOutlined, InboxOutlined,
  EyeOutlined, ReloadOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchAllAdminOrdersThunk } from '@/features/order/store/admin-orders-thunk';
import { fetchAllUsersThunk } from '@/features/users/store/users-thunk';
import { fetchAllProductsThunk } from '@/features/products/store/products-thunk';
import { ORDER_STATUS_MAP, PAYMENT_METHOD_MAP } from '@/features/order/constants/admin-orders-constants';
import { GetAllOrdersOrderStatusEnum } from '@/features/order/types/admin-orders-type';
import type { OrderResponse } from '@/features/order/types/admin-orders-type';

const { Title, Text } = Typography;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// Cột bảng đơn hàng gần đây
const buildOrderColumns = (): ColumnsType<OrderResponse> => [
  {
    title: 'Mã đơn',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => <Text className="font-mono text-xs font-semibold text-slate-700">#{id}</Text>,
  },
  {
    title: 'Khách hàng',
    key: 'customer',
    render: (_: any, record: any) => (
      <div className="flex items-center gap-2">
        <Avatar size={28} style={{ background: 'linear-gradient(135deg, #c5a880, #d4af37)' }}>
          {(record.firstName?.[0] || record.lastName?.[0] || '?').toUpperCase()}
        </Avatar>
        <Text className="text-sm font-medium">{record.firstName} {record.lastName}</Text>
      </div>
    ),
  },
  {
    title: 'Ngày đặt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => <Text className="text-xs text-gray-500">{date ? new Date(date).toLocaleString('vi-VN') : '—'}</Text>,
  },
  {
    title: 'Giá trị',
    dataIndex: 'finalAmount',
    key: 'finalAmount',
    render: (amount: number) => <Text className="font-bold text-[#c5a880]">{formatPrice(amount ?? 0)}</Text>,
    align: 'right',
  },
  {
    title: 'Thanh toán',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: (method: any) => {
      const cfg = PAYMENT_METHOD_MAP[method as keyof typeof PAYMENT_METHOD_MAP];
      return <Tag>{cfg?.label || method}</Tag>;
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (status: any) => {
      const cfg = ORDER_STATUS_MAP[status as GetAllOrdersOrderStatusEnum];
      return (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '2px 10px', borderRadius: 20,
          background: `${cfg?.color ?? '#888'}18`,
          border: `1.5px solid ${cfg?.color ?? '#888'}`,
          color: cfg?.color ?? '#888',
          fontWeight: 700, fontSize: 11,
        }}>
          {cfg?.label ?? status}
        </span>
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

const AdminDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: orders, totalElements, loading: ordersLoading } = useAppSelector((s) => s.adminOrders);
  const { list: users } = useAppSelector((s) => s.users);
  const { list: products } = useAppSelector((s) => s.products);

  // Fetch dữ liệu thật khi mount
  useEffect(() => {
    dispatch(fetchAllAdminOrdersThunk({ pageable: { page: 0, size: 50 } }));
    dispatch(fetchAllUsersThunk());
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);

  // Tính stats từ store
  const stats = useMemo(() => {
    const deliveredOrders = orders.filter((o: any) => o.orderStatus === GetAllOrdersOrderStatusEnum.Delivered);
    const revenue = deliveredOrders.reduce((sum: number, o: any) => sum + (o.finalAmount ?? 0), 0);
    const customerCount = users.filter((u: any) => (u.userRole || '').toUpperCase() === 'CUSTOMER').length;
    // sản phẩm có soldQuantity > 0 — hiện chưa có stockQuantity, dùng đế́m tổng sản phẩm làm placeholder
    const productCount = products.length;

    return [
      {
        key: 'revenue', label: 'Doanh thu (đơn đã giao)', value: revenue,
        icon: <DollarOutlined />, color: '#c5a880', bg: 'from-amber-50 to-orange-50',
        suffix: '₫', isRevenue: true,
      },
      {
        key: 'orders', label: 'Tổng đơn hàng', value: totalElements,
        icon: <ShoppingOutlined />, color: '#1677ff', bg: 'from-blue-50 to-indigo-50',
        suffix: ' đơn', isRevenue: false,
      },
      {
        key: 'customers', label: 'Khách hàng', value: customerCount,
        icon: <TeamOutlined />, color: '#52c41a', bg: 'from-green-50 to-emerald-50',
        suffix: ' người', isRevenue: false,
      },
      {
        key: 'products', label: 'Tổng sản phẩm', value: productCount,
        icon: <InboxOutlined />, color: '#722ed1', bg: 'from-purple-50 to-violet-50',
        suffix: ' SP', isRevenue: false,
      },
    ];
  }, [orders, users, products, totalElements]);

  // Tính phân bổ trạng thái đơn hàng từ store
  const orderStatusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.keys(ORDER_STATUS_MAP).forEach(k => { counts[k] = 0; });
    orders.forEach((o: any) => {
      if (o.orderStatus && counts[o.orderStatus] !== undefined) {
        counts[o.orderStatus]++;
      }
    });
    return counts;
  }, [orders]);

  const totalOrdersLocal = Object.values(orderStatusCounts).reduce((a, b) => a + b, 0);

  // Spread trước khi sort — Redux state bị freeze bởi Immer, không sort trực tiếp được
  const lowStockItems = useMemo(() =>
    [...products]
      .sort((a: any, b: any) => (b.soldQuantity ?? 0) - (a.soldQuantity ?? 0))
      .slice(0, 5),
    [products]
  );

  // Đơn hàng gần đây — 5 đơn mới nhất
  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  const ORDER_COLUMNS = buildOrderColumns();

  const handleRefresh = () => {
    dispatch(fetchAllAdminOrdersThunk({ pageable: { page: 0, size: 50 } }));
    dispatch(fetchAllUsersThunk());
    dispatch(fetchAllProductsThunk());
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} className="!mb-1">Dashboard tổng quan 📊</Title>
          <Text className="text-gray-400 text-sm">
            Cập nhật lúc {new Date().toLocaleString('vi-VN')}
          </Text>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} className="!rounded-lg" loading={ordersLoading} onClick={handleRefresh}>
            Làm mới
          </Button>
        </Space>
      </div>

      {/* STATS CARDS — dữ liệu thật */}
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
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
                    valueStyle={{ color: stat.color, fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}
                    suffix={<span className="text-base font-bold">{stat.suffix}</span>}
                    formatter={(val) =>
                      stat.isRevenue
                        ? new Intl.NumberFormat('vi-VN').format(Number(val))
                        : val
                    }
                  />
                  {stat.key === 'products' && stat.value > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-purple-500">
                      <InboxOutlined /> Tổng sản phẩm
                    </div>
                  )}
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${stat.color}18`, color: stat.color, fontSize: 20 }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CONTENT ROW */}
      <Row gutter={[16, 16]}>
        {/* Đơn hàng gần đây */}
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
              <Button type="link" className="!text-[#c5a880] !font-semibold" onClick={() => window.location.href = '/admin/orders'}>
                Xem tất cả →
              </Button>
            }
          >
            <Table
              columns={ORDER_COLUMNS}
              dataSource={recentOrders}
              pagination={false}
              size="middle"
              rowKey="id"
              loading={ordersLoading}
              className="rounded-xl overflow-hidden"
            />
          </Card>
        </Col>

        {/* Top sản phẩm bán chạy */}
        <Col xs={24} xl={8}>
          <Card
            className="!rounded-2xl border-0 h-full"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            title={
              <div className="flex items-center gap-2">
                <InboxOutlined className="text-[#c5a880]" />
                <span className="font-bold">Top bán chạy</span>
                {lowStockItems.length > 0 && (
                  <Tag color="gold" className="!rounded-full">{lowStockItems.length}</Tag>
                )}
              </div>
            }
          >
            <div className="space-y-4">
              {lowStockItems.length > 0 ? lowStockItems.map((item: any) => (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-1.5">
                    <Text className="text-sm font-medium text-slate-700 truncate max-w-[70%]">
                      {item.name || 'Sản phẩm'}
                    </Text>
                    <Text className="text-xs font-bold text-[#c5a880]">
                      Đã bán: {item.soldQuantity ?? 0}
                    </Text>
                  </div>
                  <Progress
                    percent={Math.min(Math.round(((item.soldQuantity ?? 0) / 100) * 100), 100)}
                    showInfo={false}
                    strokeColor="#c5a880"
                    trailColor="#f5f5f5"
                    size="small"
                    strokeLinecap="round"
                  />
                </div>
              )) : (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Chưa có dữ liệu sản phẩm
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* PHÂN BỔ TRẠNG THÁI ĐƠN HÀNG — dữ liệu thật */}
      <Card
        className="!rounded-2xl border-0"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        title={
          <div className="flex items-center gap-2">
            <TeamOutlined className="text-[#c5a880]" />
            <span className="font-bold">Phân bổ trạng thái đơn hàng</span>
            <span className="text-xs text-gray-400 font-normal">({orders.length} đơn hiển thị)</span>
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          {Object.entries(ORDER_STATUS_MAP).map(([key, cfg]) => {
            const count = orderStatusCounts[key] ?? 0;
            const pct = totalOrdersLocal > 0 ? Math.round((count / totalOrdersLocal) * 100) : 0;
            return (
              <Col key={key} xs={12} sm={8} md={24 / 5}>
                <div className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-2xl font-black text-slate-800">{count}</div>
                  <Tag
                    color={cfg.color === '#faad14' ? 'orange' : cfg.color === '#1677ff' ? 'blue' : cfg.color === '#52c41a' ? 'green' : cfg.color === '#389e0d' ? 'green' : 'red'}
                    className="!rounded-full !mt-1 !text-xs"
                  >
                    {cfg.label}
                  </Tag>
                  <div className="text-xs text-gray-400 mt-1">{pct}% tổng đơn</div>
                  <Progress
                    percent={pct}
                    showInfo={false}
                    size="small"
                    strokeColor={cfg.color}
                    className="!mt-2"
                  />
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
