export type {
  UserAddressResponse,
  UserAddressCreateRequest,
  UserAddressUpdateRequest,
} from '@/api-generated/api';
export {
  UserAddressCreateRequestAddressTypeEnum,
  UserAddressResponseAddressTypeEnum,
  UserAddressUpdateRequestAddressTypeEnum,
} from '@/api-generated/api';

import type { UserAddressResponse } from '@/api-generated/api';

export interface UserAddressState {
  list: UserAddressResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
