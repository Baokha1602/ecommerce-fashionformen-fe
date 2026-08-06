---
name: feature-scaffold
description: >
  Sinh toàn bộ cấu trúc thư mục và file cho một feature mới
  theo Feature-based folder structure của dự án ecommerce-fashionformen-fe.
  Tích hợp với openapi-generator-cli để lấy types/API từ src/api-generated.
  Kích hoạt khi user yêu cầu "tạo feature", "scaffold feature", "làm chức năng X",
  hoặc khi file này được đọc trực tiếp với một tên feature cụ thể.
---

# 🎯 FEATURE TARGET

```
FEATURE_NAME    = cart
FEATURE_NAME_VI = Giỏ hàng
API_TAG         = cart
ROUTE_PREFIX    = /admin          ← /admin (admin portal) hoặc / (storefront)
```

> Chỉ thay 4 dòng trên → agent tự làm toàn bộ.

---

# 📁 Cấu trúc output

```
src/
├── api-generated/api.ts          ← KHÔNG sửa tay. Chứa toàn bộ API class + models.
├── app/redux/store.ts            ← Đăng ký reducer mới vào đây
├── app/router/routes.tsx         ← Thêm route mới vào đây
└── features/{FEATURE_NAME}/
    ├── api/{FEATURE_NAME}-api.ts
    ├── components/               ← Chỉ tạo nếu cần tách component phức tạp
    ├── constants/{FEATURE_NAME}-constants.ts
    ├── pages/{FeatureName}Page.tsx
    ├── store/{FEATURE_NAME}-slice.ts
    ├── store/{FEATURE_NAME}-thunk.ts
    └── types/{FEATURE_NAME}-type.ts
```

---

# 🛠 Các bước thực thi (tuần tự)

## B0 — Kiểm tra api-generated

1. Tìm `{API_TAG}ControllerApi` trong `src/api-generated/api.ts` bằng grep/PowerShell.
2. Liệt kê các **method** và **models** liên quan cho user thấy.
3. Nếu `api-generated` chưa tồn tại → yêu cầu user chạy `npm run generate-api` trước.

## B1 — `types/{FEATURE_NAME}-type.ts`

- **Re-export** types từ `@/api-generated/api` (KHÔNG định nghĩa lại).
- Chỉ thêm type **thuần frontend**: `{FeatureName}State` cho Redux.

```ts
export type { FooDto, FooRequest } from '@/api-generated/api';
export { FooStatusEnum } from '@/api-generated/api';

export interface {FeatureName}State {
  list: FooDto[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}
```

## B2 — `api/{FEATURE_NAME}-api.ts`

- Khởi tạo API class với `axiosClient` (đã có auth interceptor).
- Unwrap `response.data.data` (cấu trúc `ApiResponse<T>` của backend).

```ts
import { {ApiClass} } from '@/api-generated/api';
import { axiosClient } from '@/shared/lib/axios';

const api = new {ApiClass}(undefined, axiosClient.defaults.baseURL, axiosClient as any);

export const {featureName}Api = {
  getAll: async () => (await api.getAll()).data.data ?? [],
  getById: async (id: number) => (await api.getById(id)).data.data,
  create: async (body: FooRequest) => (await api.create(body)).data.data,
  update: async (id: number, body: FooRequest) => (await api.update(id, body)).data.data,
  delete: async (id: number) => { await api.delete(id); },
};
```

## B3 — `store/{FEATURE_NAME}-slice.ts`

- `initialState`: `{ list: [], loading: false, submitting: false, error: null }`
- Reducers mặc định: `clearError`, `reset`
- `submitting` dùng cho create/update/delete (tránh block table khi submit form)

## B4 — `store/{FEATURE_NAME}-thunk.ts`

- Mỗi action nghiệp vụ = 1 `createAsyncThunk`
- Naming: `fetchAll{Feature}Thunk`, `create{Feature}Thunk`, `update{Feature}Thunk`, `delete{Feature}Thunk`
- `delete` thunk trả về `id` để slice filter list mà không cần re-fetch
- Error: `error?.response?.data?.message || 'Thông báo lỗi tiếng Việt'`

## B5 — `constants/{FEATURE_NAME}-constants.ts`

```ts
export const {FEATURE}_ROUTES = { ROOT: '{ROUTE_PREFIX}/{featureName}' } as const;
export const {FEATURE}_FORM_FIELDS = { NAME: 'fieldName' } as const;
// Thêm label map, color map nếu có enum (ví dụ: rank, status)
```

## B6 — `pages/{FeatureName}Page.tsx`

**Cấu trúc chuẩn:**
- `useEffect` → dispatch fetchAll thunk khi mount
- `useEffect` → hiển thị `message.error(error)` khi error thay đổi, sau đó dispatch `clearError()`
- Table + Modal pattern (xem ví dụ ranks)
- **KHÔNG** set `scroll={{ x }}` trên Table → tránh scrollbar ngang
- `pagination`: ẩn nếu `list.length <= 10`, hiện nếu nhiều hơn

**UI conventions (PHẢI tuân theo):**

| Yếu tố | Quy tắc |
|--------|---------|
| Button Primary | `background: linear-gradient(135deg, #c5a880 0%, #d4af37 100%)`, `border: none`, `color: #fff` |
| Status/Enum Tag | Dùng `border` + `color` text tương phản, KHÔNG dùng `color` prop một mình (bị mờ trên nền trắng) |
| Table row hover | `rowClassName="hover:bg-[#fafafa] transition-colors"` |
| Card/Table shadow | `boxShadow: '0 1px 6px rgba(0,0,0,0.06)'`, `borderRadius: 12` |
| Text label | `type="secondary"` cho text phụ, `strong` cho số liệu quan trọng |
| Tiền tệ | `toLocaleString('vi-VN')` |
| Page wrapper | `<div>` đơn giản, KHÔNG `overflow-auto` hay `min-h-screen` (layout cha quản lý) |

**Ví dụ badge tránh mờ:**
```tsx
// ✅ Đúng — tương phản tốt trên nền trắng
<span style={{
  padding: '3px 12px', borderRadius: 20,
  background: `${color}18`,        // 10% opacity fill
  border: `1.5px solid ${color}`,  // border đậm
  color: color,                    // text cùng màu
  fontWeight: 700, fontSize: 12,
}}>
  {label}
</span>

// ❌ Sai — Tag với color prop bị mờ trên nền trắng
<Tag color={color}>{label}</Tag>
```

## B7 — `components/` (nếu cần)

Chỉ tạo component riêng khi form/modal đủ phức tạp (> ~50 dòng JSX). Export named.

## B8 — Cập nhật `store.ts`

```ts
import {featureName}Reducer from '@/features/{FEATURE_NAME}/store/{FEATURE_NAME}-slice';
// Thêm vào reducer object:
{featureName}: {featureName}Reducer,
```

## B9 — Cập nhật `routes.tsx`

Đọc file router, thêm vào đúng layout block (admin/storefront), thay `PageStub` nếu đã có:

```tsx
import {FeatureName}Page from '@/features/{FEATURE_NAME}/pages/{FeatureName}Page';
// Thêm route:
{ path: '{ROUTE_PREFIX}/{FEATURE_NAME}', element: <{FeatureName}Page /> },
```

---

# ✅ Self-checklist

- [ ] `api-generated` tồn tại và được dùng đúng (không định nghĩa lại type)
- [ ] `axiosClient` được truyền vào API class constructor
- [ ] Reducer đăng ký trong `store.ts`
- [ ] Route thêm vào đúng layout block trong `routes.tsx`
- [ ] Import dùng alias `@/` (không dùng `../../`)
- [ ] Table KHÔNG có `scroll={{ x }}` (không có scrollbar ngang)
- [ ] Badge/Tag có contrast tốt (border + text màu, không bị mờ)
- [ ] Pagination chỉ hiện khi `list.length > 10`
- [ ] Page wrapper là `<div>` đơn giản (không `overflow-auto`)

---

# 📌 Tham khảo thực tế

| Feature | Mô tả |
|---------|-------|
| `src/features/auth/` | Pattern thủ công (viết trước khi có generated) — KHÔNG làm theo |
| `src/features/ranks/` | ✅ Pattern chuẩn mới nhất — làm theo |
