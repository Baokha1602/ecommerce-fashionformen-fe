export const COUPON_ROUTES = { ROOT: '/admin/coupon' } as const;

export const COUPON_FORM_FIELDS = {
  CODE: 'code',
  NAME: 'name',
  DISCOUNT_RATE: 'discountRate',
  MAX_DISCOUNT_AMOUNT: 'maxDiscountAmount',
  MIN_ORDER_VALUE: 'minOrderValue',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  USAGE_LIMIT: 'usageLimit',
  IS_ACTIVE: 'isActive',
} as const;
