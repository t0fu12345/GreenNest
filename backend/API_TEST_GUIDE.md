# 🌿 Hướng Dẫn Kiểm Thử GreenNest RESTful API

Tài liệu này tổng hợp toàn bộ các endpoint của backend GreenNest, kèm theo:
- **Lệnh cURL (chạy được ngay trên Terminal / PowerShell)**
- **Payload JSON mẫu chuẩn xác**
- **Kết quả kỳ vọng (Expected Status & Response)**

> **Yêu cầu trước khi test:**
> Server backend đang chạy tại: `http://localhost:5000/api` (gõ `npm run dev` trong thư mục `backend`).

---

## 📑 Mục lục
1. [Health & Metadata](#1-health--metadata)
2. [Xác thực & Người dùng (Auth & Users)](#2-xác-thực--người-dùng-auth)
3. [Cây cảnh (Plants)](#3-cây-cảnh-plants)
4. [Chuyên gia & Bộ sưu tập (Gardeners & Collections)](#4-chuyên-gia--bộ-sưu-tập)
5. [Thư viện ảnh cộng đồng (Gallery)](#5-thư-viện-ảnh-cộng-đồng-gallery)
6. [Vườn cá nhân & Checklist chăm sóc (Garden & Checklist)](#6-vườn-cá-nhân--checklist-garden)
7. [Tin nhắn liên hệ (Contact)](#7-tin-nhắn-liên-hệ-contact)
8. [Quản trị viên & Phân quyền (Admin Dashboard & RBAC)](#8-quản-trị-viên--phân-quyền-rbac)
9. [Kiểm tra lỗi dữ liệu (Validation Error 422)](#9-kiểm-tra-lỗi-dữ-liệu-validation-error-422)

---

## 1. Health & Metadata

### 1.1 Kiểm tra trạng thái hệ thống
- **Method / URL:** `GET http://localhost:5000/api/health`
- **Mục đích:** Xác nhận Express server và MongoDB đang kết nối tốt.
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/health
```
- **Kết quả kỳ vọng (`200 OK`):**
```json
{
  "success": true,
  "message": "GreenNest API is operational",
  "database": "connected"
}
```

### 1.2 Lấy danh mục bộ lọc cây cảnh (Biomes, Light, Watering, Categories)
- **Method / URL:** `GET http://localhost:5000/api/metadata/filters`
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/metadata/filters
```
- **Kết quả kỳ vọng (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "biomes": ["tropical", "succulent", "temperate", "bonsai", "herb"],
    "categories": ["araceae", "moraceae", "asparagus", "crassulaceae", "polypodiaceae"],
    "lightLevels": ["low-light", "bright-indirect", "direct-sun"],
    "wateringFrequencies": ["daily", "weekly", "biweekly", "monthly"],
    "careLevels": ["easy", "medium", "hard"]
  }
}
```

---

## 2. Xác thực & Người dùng (Auth)

### 2.1 Đăng nhập tài khoản Quản trị viên (Admin)
- **Method / URL:** `POST http://localhost:5000/api/auth/login`
- **Tài khoản mẫu:** `admin@greennest.vn` / `Admin@123456`
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@greennest.vn\",\"password\":\"Admin@123456\"}"
```
*(Trên PowerShell gõ:)*
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"admin@greennest.vn","password":"Admin@123456"}'
```
- **Kết quả kỳ vọng (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "fullName": "Quản Trị Viên GreenNest",
      "email": "admin@greennest.vn",
      "role": "admin"
    }
  }
}
```
> 💡 **Lưu ý:** Copy đoạn mã `token` trả về để dùng cho các API yêu cầu quyền Admin bên dưới.

---

### 2.2 Đăng nhập tài khoản Thành viên mẫu (Member)
- **Method / URL:** `POST http://localhost:5000/api/auth/login`
- **Tài khoản mẫu:** `nam.le@greennest.vn` / `GreenNest@2026`
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"nam.le@greennest.vn\",\"password\":\"GreenNest@2026\"}"
```
- **Kết quả kỳ vọng (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "fullName": "Lê Hoài Nam",
      "email": "nam.le@greennest.vn",
      "role": "user"
    }
  }
}
```

---

### 2.3 Xem hồ sơ cá nhân (Me Profile)
- **Method / URL:** `GET http://localhost:5000/api/auth/me`
- **Header:** `Authorization: Bearer <TOKEN_CỦA_BẠN>`
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/me ^
  -H "Authorization: Bearer <THAY_TOKEN_VAO_DAY>"
```
- **Kết quả kỳ vọng (`200 OK`):**
Trả về thông tin chi tiết của người dùng đang đăng nhập.

---

### 2.4 Đăng ký tài khoản mới
- **Method / URL:** `POST http://localhost:5000/api/auth/register`
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Trần Hoàng Bảo\",\"email\":\"bao.tran@gmail.com\",\"password\":\"Bao@123456\"}"
```
- **Kết quả kỳ vọng (`201 Created`):** Tạo thành công và trả về token mới.

---

## 3. Cây cảnh (Plants)

### 3.1 Danh sách cây cảnh (Phân trang & Lọc)
- **Method / URL:** `GET http://localhost:5000/api/plants?page=1&limit=6&biome=tropical`
- **Lệnh cURL:**
```bash
curl -X GET "http://localhost:5000/api/plants?page=1&limit=6&biome=tropical"
```
- **Kết quả kỳ vọng (`200 OK`):** Trả về mảng cây kèm thông tin phân trang `pagination: { page: 1, limit: 6, total: ... }`.

### 3.2 Tìm kiếm cây theo từ khóa
- **Method / URL:** `GET http://localhost:5000/api/plants?search=Monstera`
- **Lệnh cURL:**
```bash
curl -X GET "http://localhost:5000/api/plants?search=Monstera"
```

### 3.3 Chi tiết một cây cảnh theo ID hoặc Specimen ID
- **Method / URL:** `GET http://localhost:5000/api/plants/MON-DEL-001`
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/plants/MON-DEL-001
```

### 3.4 Thêm cây cảnh mới (Yêu cầu quyền Admin)
- **Method / URL:** `POST http://localhost:5000/api/plants`
- **Header:** `Authorization: Bearer <ADMIN_TOKEN>`
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/plants ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer <ADMIN_TOKEN>" ^
  -d "{\"name\":\"Calathea Orbifolia\",\"scientificName\":\"Calathea orbifolia\",\"specimenId\":\"CAL-ORB-021\",\"category\":\"araceae\",\"biome\":\"tropical\",\"light\":\"bright-indirect\",\"watering\":\"weekly\",\"careLevel\":\"medium\",\"description\":\"Loài kiểng lá nhiệt đới với phiến lá tròn lớn.\"}"
```
- **Kết quả kỳ vọng (`201 Created`):** Cây mới được lưu vào MongoDB.

---

## 4. Chuyên gia & Bộ sưu tập

### 4.1 Danh sách chuyên gia làm vườn (Gardeners)
- **Method / URL:** `GET http://localhost:5000/api/gardeners`
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/gardeners
```

### 4.2 Danh sách bộ sưu tập theo mùa (Collections)
- **Method / URL:** `GET http://localhost:5000/api/collections?season=all`
- **Lệnh cURL:**
```bash
curl -X GET "http://localhost:5000/api/collections?season=all"
```

---

## 5. Thư viện ảnh cộng đồng (Gallery)

### 5.1 Danh sách ảnh cộng đồng (Phân trang)
- **Method / URL:** `GET http://localhost:5000/api/gallery?page=1&limit=8`
- **Lệnh cURL:**
```bash
curl -X GET "http://localhost:5000/api/gallery?page=1&limit=8"
```

### 5.2 Thả tim ảnh (Like / Upvote)
- **Method / URL:** `POST http://localhost:5000/api/gallery/<GALLERY_ITEM_ID>/like`
- **Lệnh cURL (thay `<ID>` bằng `_id` lấy từ danh sách ảnh):**
```bash
curl -X POST http://localhost:5000/api/gallery/<GALLERY_ITEM_ID>/like
```
- **Kết quả kỳ vọng (`200 OK`):** Số lượt like tăng lên 1 đơn vị.

---

## 6. Vườn cá nhân & Checklist (Garden)

### 6.1 Xem danh sách cây trong vườn của tôi
- **Method / URL:** `GET http://localhost:5000/api/garden`
- **Header:** `Authorization: Bearer <USER_TOKEN>`
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/garden ^
  -H "Authorization: Bearer <USER_TOKEN>"
```

### 6.2 Đồng bộ giỏ cây từ LocalStorage vào tài khoản (Hybrid Sync)
- **Method / URL:** `POST http://localhost:5000/api/garden/sync`
- **Header:** `Authorization: Bearer <USER_TOKEN>`
- **Body:** Danh sách mã `specimenId` hoặc `_id` của các cây người dùng đã chọn khi chưa đăng nhập.
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/garden/sync ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer <USER_TOKEN>" ^
  -d "{\"plantIds\":[\"MON-DEL-001\",\"FIC-LYR-002\"]}"
```
- **Kết quả kỳ vọng (`200 OK`):** Các cây được thêm vào vườn và tạo sẵn lịch chăm sóc hàng ngày.

### 6.3 Đặt lại checklist chăm sóc hàng ngày
- **Method / URL:** `POST http://localhost:5000/api/garden/checklist/reset`
- **Header:** `Authorization: Bearer <USER_TOKEN>`
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/garden/checklist/reset ^
  -H "Authorization: Bearer <USER_TOKEN>"
```

---

## 7. Tin nhắn liên hệ (Contact)

### 7.1 Gửi form liên hệ / tư vấn (Public)
- **Method / URL:** `POST http://localhost:5000/api/contact`
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Hoàng Gia Huy\",\"email\":\"huy.hoang@gmail.com\",\"subject\":\"Tư vấn cây ban công\",\"message\":\"Cần tư vấn cây chịu nắng gắt tốt.\"}"
```
- **Kết quả kỳ vọng (`201 Created`):**
```json
{
  "success": true,
  "message": "Tin nhắn liên hệ đã được gửi thành công"
}
```

### 7.2 Quản trị viên xem danh sách tin nhắn (Admin Only)
- **Method / URL:** `GET http://localhost:5000/api/contact?status=all`
- **Header:** `Authorization: Bearer <ADMIN_TOKEN>`
- **Lệnh cURL:**
```bash
curl -X GET "http://localhost:5000/api/contact?status=all" ^
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

## 8. Quản trị viên & Phân quyền (RBAC)

### 8.1 Thống kê tổng quan Dashboard (Admin Only)
- **Method / URL:** `GET http://localhost:5000/api/admin/dashboard/stats`
- **Header:** `Authorization: Bearer <ADMIN_TOKEN>`
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/admin/dashboard/stats ^
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```
- **Kết quả kỳ vọng (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "totalPlants": 20,
    "totalUsers": 2,
    "totalGalleryItems": 12,
    "totalContactMessages": 3,
    "unreadContacts": 2
  }
}
```

### 8.2 Kiểm tra chặn phân quyền 403 Forbidden
- **Mục đích:** Thử gọi API Quản trị bằng Token của Thành viên thường (`userToken`).
- **Lệnh cURL:**
```bash
curl -X GET http://localhost:5000/api/admin/dashboard/stats ^
  -H "Authorization: Bearer <USER_TOKEN>"
```
- **Kết quả kỳ vọng (`403 Forbidden`):**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Truy cập bị từ chối: Yêu cầu quyền admin"
  }
}
```

---

## 9. Kiểm tra lỗi dữ liệu (Validation Error 422)

### 9.1 Gửi sai định dạng email hoặc thiếu mật khẩu khi đăng nhập
- **Lệnh cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"email-khong-hop-le\",\"password\":\"\"}"
```
- **Kết quả kỳ vọng (`422 Unprocessable Entity`):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu gửi lên không hợp lệ",
    "details": [
      "Email không đúng định dạng",
      "Mật khẩu không được để trống"
    ]
  }
}
```

---

## ⚡ Mẹo chạy Test nhanh tất cả kịch bản bằng 1 lệnh
Nếu không muốn gõ từng lệnh cURL, bạn chỉ cần mở Terminal mới và gõ:
```powershell
cd f:\Code\eProject\GreenNest\backend
npm test
```
Toàn bộ 28 kịch bản trên sẽ được kiểm thử tự động trong 2 giây!
