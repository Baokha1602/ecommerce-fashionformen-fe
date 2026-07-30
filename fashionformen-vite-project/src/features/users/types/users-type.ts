export type { UserResponse } from '@/api-generated/api';
export { UserResponseUserRoleEnum } from '@/api-generated/api';

import type { UserResponse } from '@/api-generated/api';

export interface UserUpdateRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
}

export interface UsersState {
  list: UserResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
