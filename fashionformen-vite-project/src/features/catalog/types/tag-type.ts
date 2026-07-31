import type {
  TagCreateRequest as TagRequest,
  TagResponse as Tag,
} from '@/api-generated/api';

export type { TagRequest, Tag };


export interface TagState {
  list: Tag[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

