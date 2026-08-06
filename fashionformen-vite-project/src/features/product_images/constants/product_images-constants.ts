export const RANKS_ROUTES = {
  ROOT: '/admin/customers/product_images',
} as const;

export const RANKS_FORM_FIELDS = {
  RANK_NAME: 'productImageName',
  POINT: 'point',
  RANK_DISCOUNT: 'productImageDiscount',
} as const;

/** Nhãn hiển thị tiếng Việt cho từng hạng */


/** Màu badge tương ứng từng hạng (Ant Design token color) */
export const RANK_NAME_COLOR: Record<string, string> = {
  BRONZE: '#cd7f32',
  SILVER: '#a8a8a8',
  GOLD: '#c5a880',
  DIAMOND: '#a8d8f0',
};
