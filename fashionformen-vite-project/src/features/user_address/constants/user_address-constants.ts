export const USER_ADDRESS_ROUTES = {
  ROOT: '/admin/user-address',
} as const;

export const USER_ADDRESS_FORM_FIELDS = {
  USER_ID: 'userId',
  ADDRESS: 'address',
  ADDRESS_TYPE: 'addressType',
  PROVINCE_ID: 'provinceId',
  PROVINCE_NAME: 'provinceName',
  DISTRICT_ID: 'districtId',
  DISTRICT_NAME: 'districtName',
  WARD_ID: 'wardId',
  WARD_NAME: 'wardName',
  IS_DEFAULT: 'isDefault',
} as const;

export const ADDRESS_TYPE_LABEL: Record<string, string> = {
  HOME: 'Nhà riêng',
  OFFICE: 'Văn phòng',
  OTHER: 'Khác',
};

export const ADDRESS_TYPE_COLOR: Record<string, string> = {
  HOME: '#52c41a',
  OFFICE: '#5b8dd9',
  OTHER: '#888888',
};
