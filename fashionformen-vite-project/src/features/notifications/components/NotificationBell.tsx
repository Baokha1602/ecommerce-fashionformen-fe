import React, { useState } from "react";
import { Badge, Dropdown, Button, Empty, Spin, Tooltip } from "antd";
import {
  BellOutlined,
  CheckOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useUnreadCount,
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "../hooks/useNotificationPolling";
import type { NotificationResponse } from "@/api-generated/api";

const TYPE_CONFIG: Record<
  string,
  { icon: React.ReactNode; color: string; label: string }
> = {
  ORDER_PLACED: {
    icon: <ShoppingOutlined />,
    color: "#c5a880",
    label: "Đặt hàng",
  },
  ORDER_CANCELLED: {
    icon: <CloseCircleOutlined />,
    color: "#ef4444",
    label: "Hủy đơn",
  },
  ORDER_PAYMENT_SUCCESS: {
    icon: <CreditCardOutlined />,
    color: "#10b981",
    label: "Thanh toán",
  },
  ORDER_EXPIRED: {
    icon: <TrophyOutlined />,
    color: "#f59e0b",
    label: "Hết hạn",
  },
};

const timeAgo = (dateStr?: string) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  return `${Math.floor(hrs / 24)} ngày trước`;
};

export const NotificationBell: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: unreadCount = 0 } = useUnreadCount();
  const { data: notifications = [], isLoading } = useNotifications(open);
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead, isPending: markingAll } = useMarkAllAsRead();

  const handleItemClick = (n: NotificationResponse) => {
    if (!n.read && n.id) markAsRead(n.id);
    setOpen(false);
    if (n.referenceId) {
      navigate(`/account/orders`);
    }
  };

  const dropdownContent = (
    <div
      style={{
        width: 360,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        border: "1px solid #f0f0f0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid #f5f5f5",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BellOutlined style={{ color: "#c5a880", fontSize: 16 }} />
          <span
            style={{ color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: 0.5 }}
          >
            Thông báo
          </span>
          {(unreadCount as number) > 0 && (
            <span
              style={{
                background: "#ef4444",
                color: "#fff",
                borderRadius: 10,
                padding: "1px 7px",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        {(unreadCount as number) > 0 && (
          <Tooltip title="Đánh dấu tất cả đã đọc">
            <Button
              size="small"
              type="text"
              icon={<CheckOutlined />}
              loading={markingAll}
              onClick={(e) => {
                e.stopPropagation();
                markAllAsRead();
              }}
              style={{ color: "#c5a880", fontWeight: 600, fontSize: 12 }}
            >
              Đọc tất cả
            </Button>
          </Tooltip>
        )}
      </div>

      {/* List */}
      <div style={{ maxHeight: 380, overflowY: "auto" }}>
        {isLoading ? (
          <div
            style={{ padding: "32px 0", display: "flex", justifyContent: "center" }}
          >
            <Spin />
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: "32px 16px" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span style={{ color: "#9ca3af", fontSize: 13 }}>
                  Không có thông báo nào
                </span>
              }
            />
          </div>
        ) : (
          (notifications as NotificationResponse[]).map((n) => {
            const cfg = TYPE_CONFIG[n.type || ""] || TYPE_CONFIG.ORDER_PLACED;
            return (
              <div
                key={n.id}
                onClick={() => handleItemClick(n)}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 18px",
                  cursor: "pointer",
                  background: n.read ? "#fff" : "#fffbf0",
                  borderBottom: "1px solid #f9f9f9",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = "#f9f9f9")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = n.read
                    ? "#fff"
                    : "#fffbf0")
                }
              >
                {/* Icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: `${cfg.color}18`,
                    border: `1.5px solid ${cfg.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: cfg.color,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {cfg.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: n.read ? 500 : 700,
                      fontSize: 13,
                      color: "#1a1a1a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {n.title}
                  </div>
                  {n.body && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {n.body}
                    </div>
                  )}
                  <div
                    style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}
                  >
                    {timeAgo(n.createdAt)}
                  </div>
                </div>

                {/* Unread dot */}
                {!n.read && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#c5a880",
                      flexShrink: 0,
                      alignSelf: "center",
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 18px",
          borderTop: "1px solid #f5f5f5",
          textAlign: "center",
        }}
      >
        <Button
          type="link"
          size="small"
          style={{ color: "#c5a880", fontWeight: 600, fontSize: 12 }}
          onClick={() => {
            setOpen(false);
            navigate("/account/orders");
          }}
        >
          Xem lịch sử đơn hàng →
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      dropdownRender={() => dropdownContent}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div
        style={{ position: "relative", cursor: "pointer", padding: "4px" }}
        title="Thông báo"
      >
        <Badge
          count={unreadCount as number}
          size="small"
          style={{ backgroundColor: "#ef4444" }}
          overflowCount={99}
        >
          <BellOutlined
            style={{
              fontSize: 20,
              color: open ? "#c5a880" : "#374151",
              transition: "color 0.2s",
            }}
          />
        </Badge>
      </div>
    </Dropdown>
  );
};
