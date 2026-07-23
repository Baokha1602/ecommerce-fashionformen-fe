export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  avatarUrl: string | null;
  dateOfBirth: string;
  rankName: string;
  currentPoint: number;
  userRole: string; 
  role?: string;    
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export type LoginResponse = ApiResponse<AuthData>;
export type GetMeResponse = ApiResponse<User>;

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}
