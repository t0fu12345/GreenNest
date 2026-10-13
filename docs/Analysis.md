# Phân tích dự án GreenNest (Bản nâng cấp Fullstack MERN)

Dựa trên tài liệu Đặc tả Yêu cầu Phần mềm (SRS) ban đầu và **yêu cầu mở rộng tích hợp Backend (MongoDB, Node.js)** của bạn, dưới đây là bản phân tích chi tiết.

*(Lưu ý: Để đáp ứng yêu cầu nâng cấp của bạn, các yêu cầu "không có backend" hay "chỉ dùng Local Storage" trong bản gốc đã được nâng cấp thành giải pháp lưu trữ Database thực tế, an toàn và đồng bộ hơn).*

## 1. Mục tiêu và Đối tượng (Objectives & Target Audience)
- **Người dùng cuối (Users):** Những người mới làm vườn tại nhà cần tìm cây phù hợp không gian, theo dõi lịch chăm sóc và học hỏi từ chuyên gia.
- **Quản trị viên (Admins):** Quản lý toàn bộ nội dung hệ thống (Cây trồng, Chuyên gia, Bộ sưu tập, Thư viện ảnh, Tin nhắn liên hệ).
- **Mục đích dự án:** Xây dựng ứng dụng web Responsive SPA bằng MERN Stack, kết hợp quản lý API, phân quyền, giao diện thân thiện và ứng dụng AI (Figma AI, VS Code) vào hỗ trợ lập trình (Theo FRS 14).

## 2. Các nghiệp vụ & Chức năng (Functional Requirements)

Hệ thống đáp ứng ĐẦY ĐỦ 13 tính năng chức năng của tài liệu gốc, được điều chỉnh cho mô hình Fullstack:

### a. Trải nghiệm người dùng (Guest & User)
1. **Trang chủ (Home/Landing Page - FRS 1):** Giới thiệu, hiển thị cây nổi bật và bộ sưu tập. Tích hợp thanh tìm kiếm lớn, truy cập nhanh danh mục.
2. **Danh mục cây trồng (Plants Directory - FRS 2):** Hiển thị danh sách cây dạng lưới (card grid) responsive. Fetch dữ liệu từ API thay vì file cứng (ít nhất 20 bản ghi).
3. **Tìm kiếm & Lọc (Smart Search & Filtering - FRS 3):** Tìm kiếm chuỗi linh hoạt. Lọc đa chiều theo danh mục, môi trường, ánh sáng, tần suất tưới. (Được xử lý tối ưu thông qua Query ở Backend). Hiển thị số kết quả hoặc thông báo lỗi nếu không tìm thấy.
4. **Chi tiết cây trồng (Plant Details - FRS 4):** Hiển thị tên khoa học, đặc điểm, điều kiện sinh trưởng, hướng dẫn chăm sóc (đất, chậu, nước), cảnh báo độc tính/lưu ý và gợi ý cây tương tự. Nút "Lưu vào Vườn của tôi".
5. **Hồ sơ chuyên gia (Gardener Profiles - FRS 5):** Tiểu sử, chuyên môn và các dự án/cây do chuyên gia đó chăm sóc.
6. **Thư viện ảnh tương tác (Interactive Plant Gallery - FRS 6):** Xem ảnh chi tiết dạng Lightbox/Preview. Hỗ trợ nút Previous/Next, phím điều hướng và ESC để đóng ảnh, thẻ Alt, chú thích ảnh (Caption) và ghi nguồn tác giả (Credit).
7. **Khám phá môi trường (Growing Environment Explorer - FRS 7):** Giao diện trực quan cho phép người dùng click chọn môi trường sống (VD: Trong nhà, bóng râm) để lọc cây.
8. **Bộ sưu tập theo mùa (Seasonal Collections - FRS 8):** Hiển thị các bộ sưu tập tuyển chọn (Cây ban công, Cây ít bảo dưỡng...) bằng các component React dùng chung.
9. **Vườn của tôi (Favourites & Bookmarks - FRS 9):**
   - *Cơ chế đồng bộ lưỡng thể (Hybrid Sync):* Khi chưa đăng nhập lưu tạm ở `LocalStorage`. Khi đăng nhập sẽ tự động đồng bộ lên **MongoDB**. Đảm bảo dữ liệu không mất đi khi đổi thiết bị. Có xử lý giao diện Empty State.
10. **Danh sách công việc chăm sóc (Care Checklist - FRS 13):** Check-list cho các cây trong Vườn của tôi. Có thể check hoàn thành hoặc reset. Cung cấp khoảng thời gian chăm sóc dưới dạng gợi ý (lưu trạng thái vào Database của User).
11. **Giới thiệu & Liên hệ (About & Contact - FRS 10, 11):** Form liên hệ có validate nghiêm ngặt ở client-side và lưu trữ tin nhắn vào MongoDB để Admin theo dõi, phản hồi.
12. **Giao diện & Điều hướng (Navigation & UI - FRS 12):** Header, Footer, Breadcrumbs, Mobile menu. Đảm bảo Accessibility (hỗ trợ Tab bằng bàn phím).

### b. Quản trị & Xác thực (Auth & Admin Management) - *Phân hệ nâng cấp*
- **Xác thực & Phân quyền (Auth & RBAC):** Đăng ký, đăng nhập JWT, hash mật khẩu bằng `bcrypt`. Phân quyền người dùng theo vai trò (`role: 'user'` và `role: 'admin'`). Chặn người dùng thường vào các trang quản trị (`ProtectedRoute`).
- **Bảng điều khiển quản trị (Admin Dashboard):** Thống kê số lượng cây trồng, chuyên gia, bộ sưu tập, ảnh gallery, tin nhắn liên hệ và tài khoản người dùng.
- **Quản lý Cây trồng (Plant CRUD):**
  - Xem danh sách cây (phân trang, tìm kiếm, lọc theo danh mục).
  - Thêm cây mới (Modal form / Trang tạo mới với đầy đủ thông số chăm sóc, độ khó, độc tính, ảnh).
  - Chỉnh sửa thông tin cây trồng.
  - Xóa cây khỏi hệ thống (có modal xác nhận an toàn).
- **Quản lý Chuyên gia (Gardener CRUD):**
  - Danh sách hồ sơ chuyên gia / vườn ươm đối tác.
  - Thêm, sửa, xóa thông tin chuyên gia, lĩnh vực chuyên môn và gán các cây họ bảo trợ.
- **Quản lý Bộ sưu tập (Collection CRUD):**
  - Tạo bộ sưu tập chuyên đề / theo mùa.
  - Cập nhật banner, tiêu đề, mô tả và thêm/bớt cây trong bộ sưu tập.
  - Xóa bộ sưu tập.
- **Quản lý Thư viện ảnh (Gallery CRUD - FRS 6):**
  - Quản lý danh sách ảnh hiển thị trên Gallery / Lightbox.
  - Thêm ảnh mới (URL, Alt text, Caption, Nguồn Credit, liên kết Plant).
  - Chỉnh sửa và xóa ảnh.
- **Quản lý Tin nhắn liên hệ (Contact Management - FRS 11):**
  - Xem danh sách tin nhắn gửi về từ Form Contact.
  - Đánh dấu trạng thái xử lý (`pending` / `resolved`).

## 3. Yêu cầu phi chức năng (Non-Functional Requirements)
- Hiển thị tốt trên Desktop, Tablet, Mobile (Không vỡ layout ngang, responsive hoàn hảo).
- Validate đầu vào cẩn thận (express-validator ở backend, form validation ở frontend).
- Bảo mật: Mã hóa mật khẩu bằng bcrypt, bảo vệ header với Helmet, kiểm soát CORS, Rate-limit chống brute-force.
- Tối ưu hóa ảnh/assets, giữ các chức năng lọc chạy mượt mà không gây giật layout (tránh Layout Shift).
- Xử lý nhẹ nhàng khi API lỗi hoặc không tìm thấy dữ liệu (Unified Error Handling).
- Thiết kế tương phản tốt, UI dễ đọc, dễ tiếp cận (Accessibility WCAG).

## 4. Cấu trúc Cơ sở dữ liệu (MongoDB Collections)
- **`users`:** `_id`, `name`, `email`, `password` (hashed), `role` (`user` | `admin`), `avatar`, `my_garden` (mảng ObjectIds cây đã lưu), `checklists` (trạng thái task chăm sóc), `createdAt`, `updatedAt`.
- **`plants`:** `_id`, `name`, `botanical_name`, `slug`, `category`, `environment`, `light`, `watering`, `care_instructions` (đất, chậu, chu kỳ tưới), `toxicity` (chó/mèo/người), `images` (mảng object url, alt, isPrimary), `gardener_id`, `status` (`published` | `draft`).
- **`gardeners`:** `_id`, `name`, `avatar`, `bio`, `specialization`, `experience_years`, `contact_email`, `associated_plants` (mảng ObjectIds).
- **`collections`:** `_id`, `title`, `slug`, `description`, `cover_image`, `season` (`spring` | `summer` | `autumn` | `winter` | `all`), `is_featured`, `plants` (mảng ObjectIds).
- **`galleries`:** `_id`, `imageUrl`, `alt`, `caption`, `credit`, `plantId` (ObjectId liên kết cây), `aspectRatio` (`tall` | `wide` | `square` | `large`), `likesCount`, `createdAt`.
- **`contacts`:** `_id`, `fullName`, `email`, `subject`, `message`, `status` (`pending` | `resolved`), `createdAt`.

## 5. Cấu trúc dự án (Modular Architecture)
```text
greennest/
├── frontend/                              # React 18+ (Vite), React Router v6, Axios
│   ├── src/
│   │   ├── assets/                        # Ảnh tĩnh, icon
│   │   ├── components/
│   │   │   ├── common/                    # Navbar, Footer, LoadingSpinner, Breadcrumb
│   │   │   ├── plant/                     # PlantCard, CareTelemetry, PlantFilterBar
│   │   │   ├── gallery/                   # LightboxModal, ImagePreviewCard
│   │   │   └── admin/                     # AdminLayout, AdminSidebar, AdminNavbar, DataTable, ConfirmModal
│   │   ├── context/
│   │   │   ├── AuthContext.jsx            # State đăng nhập, Token, Role (user/admin)
│   │   │   └── GardenContext.jsx          # State My Garden & Đồng bộ LocalStorage/API
│   │   ├── pages/
│   │   │   ├── Home.jsx                   # Trang chủ (Overview & Bento)
│   │   │   ├── PlantsDirectory.jsx        # Danh mục cây trồng (Lọc đa chiều)
│   │   │   ├── PlantDetail.jsx            # Chi tiết cây trồng & Macro Telemetry
│   │   │   ├── Gardeners.jsx              # Danh sách chuyên gia thực vật
│   │   │   ├── Gallery.jsx                # Thư viện ảnh tương tác Lightbox
│   │   │   ├── Collections.jsx            # Bộ sưu tập theo mùa & chủ đề
│   │   │   ├── MyGarden.jsx               # Vườn cá nhân & Checklist chăm sóc
│   │   │   ├── About.jsx                  # Giới thiệu sứ mệnh GreenNest
│   │   │   ├── Contact.jsx                # Biểu mẫu liên hệ & phản hồi
│   │   │   ├── Auth/                      # Login.jsx, Register.jsx
│   │   │   └── admin/                     # KHU VỰC QUẢN TRỊ ADMIN (CRUD)
│   │   │       ├── Dashboard.jsx          # Thống kê tổng quan số liệu
│   │   │       ├── PlantManager.jsx       # CRUD Cây trồng (Table + Modal Form)
│   │   │       ├── GardenerManager.jsx    # CRUD Chuyên gia
│   │   │       ├── CollectionManager.jsx  # CRUD Bộ sưu tập
│   │   │       ├── GalleryManager.jsx     # CRUD Thư viện ảnh Lightbox
│   │   │       └── ContactManager.jsx     # Xem & xử lý tin nhắn liên hệ
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx              # Khai báo toàn bộ Route hệ thống
│   │   │   └── ProtectedRoute.jsx         # Chặn quyền (Yêu cầu Login hoặc role Admin)
│   │   └── services/                      # API Client (apiClient.js, plantApi.js, authApi.js...)
│   └── package.json
│
└── backend/                               # Node.js, Express, MongoDB (Mongoose)
    ├── src/
    │   ├── config/                        # db.js (Kết nối MongoDB), env.js
    │   ├── middlewares/
    │   │   ├── auth.middleware.js         # Xác thực JWT Token
    │   │   ├── role.middleware.js         # Kiểm tra quyền Admin (RBAC)
    │   │   ├── validator.middleware.js    # Kiểm tra dữ liệu đầu vào (express-validator)
    │   │   └── errorHandler.middleware.js # Bắt lỗi tập trung (Global Error Handler)
    │   ├── modules/                       # KIẾN TRÚC MODULAR THEO TỪNG TÍNH NĂNG
    │   │   ├── auth/                      # auth.routes.js, auth.controller.js, auth.service.js
    │   │   ├── user/                      # Profile, My Garden Sync, Checklist
    │   │   ├── plant/                     # Public Read + Admin CRUD Cây trồng
    │   │   ├── gardener/                  # Public Read + Admin CRUD Chuyên gia
    │   │   ├── collection/                # Public Read + Admin CRUD Bộ sưu tập
    │   │   ├── gallery/                   # Public Read + Admin CRUD Ảnh Lightbox
    │   │   └── contact/                   # Client gửi liên hệ + Admin xử lý tin nhắn
    │   └── server.js                      # Entry point khởi chạy ứng dụng Express
    └── package.json
```
