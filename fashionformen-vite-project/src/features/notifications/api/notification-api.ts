import { NotificationControllerApi, type Pageable } from "@/api-generated/api";
import { axiosClient } from "@/shared/lib/axios";

const api = new NotificationControllerApi(
  undefined,
  axiosClient.defaults.baseURL,
  axiosClient as any
);

export const notificationApi = {
  getMyNotifications: async (page = 0, size = 10) => {
    const pageable: Pageable = { page, size };
    const res = await api.getMyNotifications(pageable);
    return res.data.data;
  },

  getUnreadCount: async () => {
    const res = await api.getUnreadCount();
    return res.data.data;
  },

  markAsRead: async (id: number) => {
    const res = await api.markAsRead(id);
    return res.data.data;
  },

  markAllAsRead: async () => {
    await api.markAllAsRead();
  },
};
