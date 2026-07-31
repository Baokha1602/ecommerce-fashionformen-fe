export { UserResponseUserRoleEnum } from '@/api-generated/api';

export interface UserResponse {
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  avatarImage?: string;
  currentPoint?: number;
  userRole?: string;
  isActive?: boolean;
  dateOfBirth?: string;
  rankName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserUpdateRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  avatarImage?: string;
  dateOfBirth?: string;
}

export interface UsersState {
  list: UserResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

