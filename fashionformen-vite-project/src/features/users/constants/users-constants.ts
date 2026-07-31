export const USERS_ROUTES = {
  ROOT: '/admin/customers',
} as const;

export const USER_ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  STAFF: 'Nhân viên',
  CUSTOMER: 'Khách hàng',
};

export const USER_ROLE_COLOR: Record<string, string> = {
  ADMIN: '#c5a880',
  STAFF: '#5b8dd9',
  CUSTOMER: '#52c41a',
};
