# FASHION FOR MEN — E-COMMERCE WEB

Đây là giao diện người dùng (Frontend) thuộc hệ thống Thương mại điện tử thời trang nam, bao gồm cả trang mua sắm dành cho khách hàng (Storefront) và trang quản trị dành cho Admin và nhân viên (Staff Dashboard). Hệ thống kết nối trực tiếp với RESTful API từ Backend để xử lý dữ liệu sản phẩm, đơn hàng, tài khoản và các nghiệp vụ liên quan.

---

## 1. CÔNG NGHỆ SỬ DỤNG

- **Nền tảng xây dựng:** React 19, TypeScript, Vite
- **Thư viện giao diện:** Ant Design (bộ component chuẩn cho bảng dữ liệu, form, modal), Tailwind CSS (tùy chỉnh giao diện và responsive layout)
- **Quản lý trạng thái:** Redux Toolkit (xử lý client state như giỏ hàng, phiên đăng nhập), TanStack React Query (đồng bộ và cache dữ liệu từ server)
- **Giao tiếp API:** Axios kết hợp TypeScript Client được sinh tự động từ Swagger/OpenAPI của Backend
- **Điều hướng:** React Router DOM với phân quyền route theo vai trò người dùng (ADMIN, STAFF, CUSTOMER)
- **Tiện ích:** Day.js (xử lý ngày tháng), FullCalendar (hiển thị lịch biểu)
- **Chất lượng code:** ESLint, Prettier

---

## 2. CÁC PHÂN HỆ CHỨC NĂNG CHÍNH

**Storefront — Trang mua sắm dành cho khách hàng:**
- Trang chủ giới thiệu sản phẩm, danh mục và banner khuyến mãi
- Trang cửa hàng (Shop) với tìm kiếm, lọc sản phẩm và xem chi tiết
- Giỏ hàng, quy trình đặt hàng và thanh toán trực tuyến
- Theo dõi lịch sử đơn hàng và kết quả thanh toán
- Quản lý địa chỉ giao hàng và hồ sơ cá nhân

**Admin & Staff Dashboard — Trang quản trị hệ thống:**
- Tổng quan Dashboard (báo cáo và thống kê)
- Quản lý Catalog: Sản phẩm, biến thể (màu sắc, kích thước), hình ảnh sản phẩm, đánh giá, nhãn (Tags), danh mục, thương hiệu
- Quản lý Đơn hàng: Tiếp nhận, xử lý, cập nhật trạng thái giao hàng
- Quản lý Khách hàng và hệ thống hạng thành viên (Customer Ranks)
- Quản lý Nhân sự (Staff)
- Quản lý Marketing: Mã giảm giá (Coupon/Voucher), banner quảng cáo

---

## 3. CẤU TRÚC THƯ MỤC SOURCE CODE

```
src/
├── api-generated/     # TypeScript API Client sinh tự động từ Swagger Backend
├── app/
│   ├── init/          # Khởi tạo ứng dụng, load token ban đầu
│   ├── layouts/       # Các layout chính: StorefrontLayout, MainLayout, AuthLayout
│   ├── providers/     # Cấu hình React Query, Redux, Ant Design, Theme
│   ├── redux/         # Redux Store
│   └── router/        # Cấu hình route và bảo vệ route theo phân quyền
├── components/        # Các component dùng chung toàn ứng dụng
├── features/          # Các module tính năng theo nghiệp vụ
│   ├── auth/          # Đăng nhập, đăng ký, quên mật khẩu
│   ├── cart/          # Giỏ hàng
│   ├── order/         # Đặt hàng, thanh toán, lịch sử, quản lý đơn (admin)
│   ├── products/      # Quản lý sản phẩm, hình ảnh, đánh giá, tags, biến thể
│   ├── category/      # Quản lý danh mục
│   ├── users/         # Quản lý khách hàng và nhân viên
│   ├── coupon/        # Mã giảm giá
│   ├── banners/       # Banner quảng cáo
│   ├── ranks/         # Hạng thành viên
│   └── ...            # Các module khác (brands, tags, user_address, shop, landing...)
├── shared/            # Hooks, utils, helper dùng chung
└── styles/            # CSS và theme tùy chỉnh
```

---

## 4. HƯỚNG DẪN KHỞI CHẠY

**Cài đặt dependencies:**
```bash
npm install
```

**Chạy môi trường phát triển:**
```bash
npm run dev
```
Ứng dụng chạy tại: `http://localhost:5173`

**Sinh lại API Client khi Backend thay đổi:**
```bash
npm run generate-api
```
*(Lệnh này kết nối tới `http://localhost:8080/v3/api-docs` và tự động sinh lại toàn bộ TypeScript API Client vào thư mục `src/api-generated/`)*

**Build production:**
```bash
npm run build
```
