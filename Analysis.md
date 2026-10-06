# Phân tích dự án GreenNest (Bản nâng cấp Fullstack MERN)

Dựa trên tài liệu Đặc tả Yêu cầu Phần mềm (SRS) ban đầu và **yêu cầu mở rộng tích hợp Backend (MongoDB, Node.js)** của bạn, dưới đây là bản phân tích chi tiết.

*(Lưu ý: Để đáp ứng yêu cầu nâng cấp của bạn, các yêu cầu "không có backend" hay "chỉ dùng Local Storage" trong bản gốc đã được nâng cấp thành giải pháp lưu trữ Database thực tế, an toàn và đồng bộ hơn).*

## 1. Mục tiêu và Đối tượng (Objectives & Target Audience)
- **Người dùng cuối (Users):** Những người mới làm vườn tại nhà cần tìm cây phù hợp không gian, theo dõi lịch chăm sóc và học hỏi từ chuyên gia.
- **Quản trị viên (Admins):** Quản lý toàn bộ nội dung hệ thống (Cây, Chuyên gia, Bộ sưu tập).
- **Mục đích dự án:** Xây dựng ứng dụng web Responsive SPA bằng MERN Stack, kết hợp quản lý API, phân quyền, giao diện thân thiện và ứng dụng AI (Figma AI, VS Code) vào hỗ trợ lập trình (Theo FRS 14).

## 2. Các nghiệp vụ & Chức năng (Functional Requirements)

Hệ thống đáp ứng ĐẦY ĐỦ 13 tính năng chức năng của tài liệu gốc, được điều chỉnh cho mô hình Fullstack:

### a. Trải nghiệm người dùng (Guest & User)
1. **Trang chủ (Home/Landing Page - FRS 1):** Giới thiệu, hiển thị cây nổi bật và bộ sưu tập. Tích hợp thanh tìm kiếm lớn, truy cập nhanh danh mục.
2. **Danh mục cây trồng (Plants Directory - FRS 2):** Hiển thị danh sách cây dạng lưới (card grid) responsive. Fetch dữ liệu từ API thay vì file cứng (ít nhất 20 bản ghi).
3. **Tìm kiếm & Lọc (Smart Search & Filtering - FRS 3):** Tìm kiếm chuỗi linh hoạt. Lọc đa chiều theo danh mục, môi trường, ánh sáng, tần suất tưới. (Được xử lý tối ưu thông qua Query ở Backend). Hiển thị số kết quả hoặc thông báo lỗi nếu không tìm thấy.
4. **Chi tiết cây trồng (Plant Details - FRS 4):** Hiển thị tên khoa học, đặc điểm, điều kiện sinh trưởng, hướng dẫn chăm sóc (đất, chậu, nước), cảnh báo độc tính/lưu ý và gợi ý cây tương tự. Nút "Lưu vào Vườn của tôi".
5. **Hồ sơ chuyên gia (Gardener Profiles - FRS 5):** Tiểu sử, chuyên môn và các dự án/cây do chuyên gia đó chăm sóc.
6. **Thư viện ảnh tương tác (Interactive Plant Gallery - FRS 6):** Xem ảnh chi tiết dạng Lightbox/Preview. Hỗ trợ nút Previous/Next, nhấn phím (keyboard) để đóng ảnh, thẻ Alt cho ảnh.
7. **Khám phá môi trường (Growing Environment Explorer - FRS 7):** Giao diện trực quan cho phép người dùng click chọn môi trường sống (VD: Trong nhà, bóng râm) để lọc cây.
8. **Bộ sưu tập theo mùa (Seasonal Collections - FRS 8):** Hiển thị các bộ sưu tập tuyển chọn (Cây ban công, Cây ít bảo dưỡng...) bằng các component React dùng chung.
9. **Vườn của tôi (Favourites & Bookmarks - FRS 9):**
   - *Nâng cấp:* Thay vì chỉ lưu Local Storage, người dùng đăng nhập để lưu danh sách yêu thích vào **MongoDB**. Đảm bảo dữ liệu không mất đi khi đổi máy. Có xử lý giao diện Empty State.
10. **Danh sách công việc chăm sóc (Care Checklist - FRS 13):** Check-list cho các cây trong Vườn của tôi. Có thể check hoàn thành hoặc reset. Cung cấp khoảng thời gian chăm sóc dưới dạng gợi ý. (Trạng thái checklist lưu ở Database của User).
11. **Giới thiệu & Liên hệ (About & Contact - FRS 10, 11):** Form liên hệ có validate nghiêm ngặt ở client-side (Email hợp lệ, không bỏ trống).
12. **Giao diện & Điều hướng (Navigation & UI - FRS 12):** Header, Footer, Breadcrumbs, Mobile menu. Đảm bảo Accessibility (hỗ trợ Tab bằng bàn phím).

### b. Quản trị & Xác thực (Auth & Admin) - *Tính năng nâng cấp*
- **Đăng nhập/Đăng ký:** Cấp phát JWT token để phân quyền.
- **Admin Dashboard:** Cung cấp giao diện riêng để Admin thao tác CRUD (Thêm, Sửa, Xóa) cho: Danh sách Cây trồng, Chuyên gia và Bộ sưu tập.

## 3. Yêu cầu phi chức năng (Non-Functional Requirements)
- Hiển thị tốt trên Desktop, Tablet, Mobile (Không vỡ layout ngang).
- Validate đầu vào cẩn thận, không lưu trữ mật khẩu dưới dạng thô (Phải mã hóa qua Backend).
- Tối ưu hóa ảnh/assets, giữ các chức năng lọc chạy mượt mà.
- Xử lý nhẹ nhàng khi API lỗi hoặc không tìm thấy dữ liệu.
- Thiết kế tương phản tốt, UI dễ đọc, dễ tiếp cận.

## 4. Cấu trúc Cơ sở dữ liệu (MongoDB Collections)
- **`users`:** `name`, `email`, `password` (hashed), `role`, `my_garden` (Lưu ObjectIds của plants), `checklists` (Trạng thái care checklist).
- **`plants`:** `name`, `botanical_name`, `category`, `environment`, `light`, `watering`, `care_instructions`, `toxicity`, `images`...
- **`gardeners`:** `name`, `bio`, `specialization`, `associated_plants`.
- **`collections`:** `title`, `description`, `plants` (Array).

## 5. Cấu trúc dự án (Modular Architecture)
```text
greennest/
├── frontend/                   # React (Vite), TailwindCSS, Axios
│   ├── src/
│   │   ├── components/         # Reusable UI (PlantCard, Lightbox, Navbar...)
│   │   ├── pages/              # Màn hình (Home, Directory, Detail, Admin, Auth...)
│   │   └── context/            # Quản lý State toàn cục (AuthContext)
│   └── package.json
└── backend/                    # Node.js, Express, Mongoose (Kiến trúc Modular)
    ├── src/
    │   ├── cores/              # Chứa các thành phần cốt lõi
    │   │   ├── middlewares/    # Auth (JWT), Validation, ErrorHandler
    │   │   └── config/         # Cấu hình kết nối DB, biến môi trường (Env)
    │   ├── modules/            # Phân tách rõ ràng từng chức năng (Features)
    │   │   ├── auth/           # Login, Register (Route, Controller, Service...)
    │   │   ├── user/           # Quản lý User & My Garden
    │   │   ├── plant/          # CRUD Cây trồng
    │   │   ├── gardener/       # CRUD Chuyên gia
    │   │   └── collection/     # CRUD Bộ sưu tập
    │   └── server.js           # Entry point của ứng dụng
    └── package.json
```
