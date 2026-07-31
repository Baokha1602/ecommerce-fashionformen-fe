export const RANKS_ROUTES = {
  ROOT: '/admin/customers/ranks',
} as const;

export const RANKS_FORM_FIELDS = {
  RANK_NAME: 'rankName',
  POINT: 'point',
  RANK_DISCOUNT: 'rankDiscount',
} as const;

/** Nhãn hiển thị tiếng Việt cho từng hạng */
export const RANK_NAME_LABEL: Record<string, string> = {
  BRONZE: 'Đồng',
  SILVER: 'Bạc',
  GOLD: 'Vàng',
  DIAMOND: 'Kim cương',
};

/** Màu badge tương ứng từng hạng (Ant Design token color) */
export const RANK_NAME_COLOR: Record<string, string> = {
  BRONZE: '#cd7f32',
  SILVER: '#a8a8a8',
  GOLD: '#c5a880',
  DIAMOND: '#a8d8f0',
};
