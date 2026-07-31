/**
 * Helper an toàn giúp trích xuất mảng từ response của backend.
 * Xử lý các trường hợp:
 * - Direct array: [ ... ]
 * - Wrapped: { data: [ ... ] }
 * - Paginated: { content: [ ... ] } hoặc { data: { content: [ ... ] } }
 * - Spring Page: { data: { items: [ ... ] } }
 */
export const ensureArray = <T = any>(res: any): T[] => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (typeof res === 'object') {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.content)) return res.content;
    if (Array.isArray(res.items)) return res.items;
    if (Array.isArray(res.result)) return res.result;

    if (res.data && typeof res.data === 'object') {
      if (Array.isArray(res.data.content)) return res.data.content;
      if (Array.isArray(res.data.items)) return res.data.items;
      if (Array.isArray(res.data.result)) return res.data.result;
    }
  }
  return [];
};
