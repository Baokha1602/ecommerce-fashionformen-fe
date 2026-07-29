export type { UserResponse } from '@/api-generated/api';
export { UserResponseUserRoleEnum } from '@/api-generated/api';

import type { UserResponse } from '@/api-generated/api';

export interface UsersState {
  list: UserResponse[];
  loading: boolean;
  error: string | null;
}
