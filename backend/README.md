# GreenNest Backend - RESTful API

> Nền tảng API phục vụ Triển lãm thực vật sinh thái, Giám sát vi khí hậu & Vườn cá nhân GreenNest (Dự án Aptech eProject MERN Stack).

---

## 1. Công nghệ cốt lõi
- **Runtime:** Node.js (v18+ / v20+ LTS)
- **Framework:** Express.js 4.x
- **Cơ sở dữ liệu:** MongoDB với Mongoose 8.x ODM
- **Xác thực & Bảo mật:** JSON Web Token (JWT), `bcryptjs` (salt 10 rounds), `cors`
- **Ghi log & Tiện ích:** `morgan`, `dotenv`

---

## 2. Cấu trúc thư mục (Modular MCS Architecture - Model - Controller - Service)
```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js                     # Kết nối cơ sở dữ liệu MongoDB
│   │   └── constants.js              # Các hằng số (Roles, Biomes, Pagination)
│   ├── middlewares/
│   │   ├── auth.middleware.js        # Xác thực JWT Bearer Token
│   │   ├── role.middleware.js        # Phân quyền Admin Guard (RBAC)
│   │   ├── validator.middleware.js   # Kiểm tra tính hợp lệ dữ liệu
│   │   └── errorHandler.middleware.js # Bắt lỗi 404 và Global Error Handler
│   ├── modules/                      # KIẾN TRÚC MODULAR THEO TỪNG PHÂN HỆ
│   │   ├── auth/                     # user.model.js, auth.service.js, auth.controller.js, auth.routes.js
│   │   ├── plant/                    # plant.model.js, plant.service.js, plant.controller.js, plant.routes.js
│   │   ├── user/                     # garden.service.js, garden.controller.js, garden.routes.js
│   │   ├── gardener/                 # gardener.model.js, gardener.service.js, gardener.controller.js, gardener.routes.js
│   │   ├── collection/               # collection.model.js, collection.service.js, collection.controller.js, collection.routes.js
│   │   ├── gallery/                  # gallery.model.js, gallery.service.js, gallery.controller.js, gallery.routes.js
│   │   ├── contact/                  # contact.model.js, contact.service.js, contact.controller.js, contact.routes.js
│   │   └── admin/                    # admin.service.js, admin.controller.js, admin.routes.js
│   ├── utils/
│   │   ├── apiResponse.js            # Chuẩn hóa cấu trúc JSON Response (OpenAPI standard)
│   │   └── generateToken.js          # Ký JWT Token
│   └── server.js                     # Entry point khởi chạy server Express
├── seeder/
│   └── seeder.js                     # Script nạp dữ liệu mẫu vào MongoDB
├── .env.example                      # Mẫu biến môi trường
├── .env                              # Biến môi trường cục bộ
└── package.json
```

---

## 3. Cài đặt & Khởi chạy

### Bước 1: Cài đặt Dependencies
```bash
cd backend
npm install
```

### Bước 2: Cấu hình biến môi trường (`.env`)
Tạo file `.env` dựa trên `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/greennest
JWT_SECRET=greennest_botanical_jwt_secret_key_2026_super_secure
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### Bước 3: Nạp dữ liệu mẫu (Seeder)
Khởi động MongoDB trên máy hoặc dùng MongoDB Atlas, sau đó chạy:
```bash
npm run seed
```
*(Lệnh này sẽ tự động nạp 20 cây trồng với đầy đủ thông số telemetry, 4 chuyên gia, 4 bộ sưu tập mùa, 20 ảnh gallery Pinterest, 3 tài khoản người dùng và dữ liệu vườn mẫu).*

### Bước 4: Khởi động Server
- Chế độ phát triển (Auto-reload với nodemon):
```bash
npm run dev
```
- Chế độ thông thường:
```bash
npm start
```
Server chạy tại: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

---

## 4. Tài khoản kiểm thử có sẵn (Test Accounts)

| Vai trò | Email | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@greennest.vn` | `Admin@123456` | Toàn quyền Dashboard & CRUD Cây trồng, Chuyên gia, BST, Gallery, Duyệt tin nhắn |
| **Thành viên (User)** | `nam.le@greennest.vn` | `GreenNest@2026` | Xem công khai, Bookmark, Lưu Vườn cá nhân, Care Checklist |
| **Thành viên (User)** | `quan.tran@gmail.com` | `GreenNest@2026` | Xem công khai, Bookmark, Lưu Vườn cá nhân |

---

## 5. Danh sách API Endpoints chính

### 🔐 Xác thực (`/api/auth`)
- `POST /api/auth/register`: Đăng ký tài khoản mới
- `POST /api/auth/login`: Đăng nhập, nhận JWT Token
- `GET /api/auth/me`: Lấy thông tin tài khoản đang đăng nhập
- `PUT /api/auth/change-password`: Đổi mật khẩu

### 🌿 Cây trồng (`/api/plants`)
- `GET /api/plants`: Danh sách cây (hỗ trợ search `q`, lọc `category`, `biome`, `light`, `watering`, `careLevel`, phân trang `page`, `limit`)
- `GET /api/plants/:id`: Chi tiết cây theo ID hoặc specimenId
- `GET /api/plants/:id/related`: Gợi ý các loài cây tương tự
- `POST /api/plants` *(Admin)*: Thêm cây mới
- `PUT /api/plants/:id` *(Admin)*: Cập nhật cây
- `DELETE /api/plants/:id` *(Admin)*: Xóa cây

### 🪴 Vườn của tôi (`/api/garden`)
- `GET /api/garden`: Xem cây trong vườn & trạng thái checklist
- `POST /api/garden`: Thêm cây vào vườn
- `DELETE /api/garden/:gardenItemId`: Xóa cây khỏi vườn
- `POST /api/garden/sync`: **Hybrid Sync** đồng bộ mảng ID từ LocalStorage khi login
- `PUT /api/garden/checklist`: Cập nhật trạng thái hoàn thành task chăm sóc (FRS 13)
- `POST /api/garden/checklist/reset`: Làm mới checklist cho chu kỳ tuần mới
- `POST /api/garden/bookmarks/toggle`: Bật/tắt bookmark cây yêu thích

### 🧑‍🌾 Chuyên gia (`/api/gardeners`)
- `GET /api/gardeners`: Danh sách chuyên gia
- `GET /api/gardeners/:id`: Chi tiết chuyên gia & cây họ bảo trợ
- `POST /api/gardeners` *(Admin)*: Thêm chuyên gia
- `PUT /api/gardeners/:id` *(Admin)*: Cập nhật chuyên gia
- `DELETE /api/gardeners/:id` *(Admin)*: Xóa chuyên gia

### 📚 Bộ sưu tập (`/api/collections`)
- `GET /api/collections`: Danh sách BST (lọc theo mùa `season`)
- `GET /api/collections/:id`: Chi tiết BST kèm danh sách cây
- `POST /api/collections` *(Admin)*: Tạo BST mới
- `PUT /api/collections/:id` *(Admin)*: Cập nhật BST
- `DELETE /api/collections/:id` *(Admin)*: Xóa BST

### 🖼️ Thư viện ảnh tương tác (`/api/gallery`)
- `GET /api/gallery`: Lấy danh sách ảnh Lightbox (phân trang, lọc `aspectRatio`)
- `POST /api/gallery/:id/like`: Bấm thích (like) ảnh
- `POST /api/gallery` *(Admin)*: Thêm ảnh mới
- `PUT /api/gallery/:id` *(Admin)*: Cập nhật chú thích/credit
- `DELETE /api/gallery/:id` *(Admin)*: Xóa ảnh

### 💌 Hòm thư liên hệ (`/api/contact`)
- `POST /api/contact`: Gửi tin nhắn liên hệ (khách/thành viên)
- `GET /api/contact` *(Admin)*: Xem danh sách tin nhắn khách gửi
- `PATCH /api/contact/:id/status` *(Admin)*: Đổi trạng thái (`pending` / `resolved`)

### 📊 Bảng điều khiển quản trị (`/api/admin`)
- `GET /api/admin/dashboard/stats` *(Admin)*: Thống kê số lượng cây, chuyên gia, bộ sưu tập, ảnh gallery, tin nhắn chờ duyệt và thành viên.
