import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../api/notification-api";
import { useAppSelector } from "@/app/redux/hooks";

const POLL_INTERVAL = 20_000; // 20 seconds

// Hook poll so luong thong bao chua doc (dung cho badge trong header)
export const useUnreadCount = () => {
  const { user } = useAppSelector((s) => s.auth);

  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationApi.getUnreadCount(),
    // Chi poll khi da dang nhap
    enabled: !!user,
    refetchInterval: POLL_INTERVAL,
    staleTime: 10_000,
    select: (data) => (data as any)?.count ?? 0,
  });
};

// Hook lay danh sach thong bao (dung cho dropdown)
export const useNotifications = (enabled: boolean) => {
  const { user } = useAppSelector((s) => s.auth);

  return useQuery({
    queryKey: ["notifications", "list"],
    queryFn: () => notificationApi.getMyNotifications(0, 15),
    enabled: !!user && enabled,
    refetchInterval: enabled ? POLL_INTERVAL : false,
    staleTime: 10_000,
    select: (data) => (data as any)?.content ?? [],
  });
};

// Mutation danh dau da doc
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// Mutation danh dau tat ca da doc
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
