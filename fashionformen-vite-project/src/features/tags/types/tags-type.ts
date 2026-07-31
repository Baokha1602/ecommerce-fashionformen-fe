export type { TagResponse, TagCreateRequest, TagUpdateRequest } from '@/api-generated/api';

import type { TagResponse } from '@/api-generated/api';

export interface TagsState {
  list: TagResponse[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
