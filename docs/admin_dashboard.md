# Design Requirement: GreenNest Admin Dashboard - Clean Professional Features with PvZ Visual Accents

## 1. Concept & Visual Style
- **Theme/Vibe**: Clean, professional, and bright e-commerce Admin Dashboard for "GreenNest" (Houseplant & Home Decor Store). Incorporate a vibrant, sunny "Plants vs. Zombies" color palette and minor plant/character sticker badges purely as visual visual accents.
- **Color Palette**:
  - **Background**: Soft sunny cream-mint (#f8faf6), crisp white card backgrounds (#ffffff).
  - **Primary Accents**: Lawn Green (#4caf50), Sunflower Yellow (#fbc02d), Mint Green (#81c784).
  - **Status Badges**:
    - Active / Published / Resolved: Soft Green (#e8f5e9, text #2e7d32)
    - Pending / Draft: Soft Yellow (#fff8e1, text #f57f17)
    - Alert / Blocked / Error: Soft Red (#ffebee, text #c62828)
- **UI Elements**: Softly rounded cards (`rounded-2xl`), subtle shadows, clean modern typography, decorated with clean botanical icons and subtle PvZ plant sticker icons (Sunflower, Peashooter, Wall-nut).

---

## 2. Standard Business Structure (100% GreenNest Functional Specs)

### A. Sidebar Navigation (Left Panel)
- **Brand Logo**: GreenNest Logo with a small plant/sunflower icon.
- **Standard Admin Navigation Menu**:
  1. 📊 **Tổng quan (Dashboard)**: Thống kê tổng quan & hoạt động hệ thống.
  2. 🪴 **Quản lý Cây trồng (Plants)**: Danh sách cây, tên khoa học, thông số chăm sóc & độ độc hại.
  3. 👨‍🌾 **Quản lý Chuyên gia (Gardeners)**: Hồ sơ chuyên gia thực vật & kinh nghiệm.
  4. 📚 **Quản lý Bộ sưu tập (Collections)**: Các bộ sưu tập cây theo mùa & banner.
  5. 🖼️ **Quản lý Thư viện (Galleries)**: Quản lý ảnh Lightbox, chú thích & nguồn ảnh.
  6. ✉️ **Tin nhắn Liên hệ (Contacts)**: Tiếp nhận và xử lý tin nhắn khách hàng (`chờ xử lý` / `đã xử lý`).
  7. 👤 **Quản lý Tài khoản (Users)**: Phân quyền tài khoản (`admin` / `user`).

---

### B. Header Area (Top Bar)
- **Search Bar**: "Tìm kiếm cây trồng, chuyên gia, bộ sưu tập, tin nhắn..."
- **Quick Action**: Button "+ Thêm Cây Mới" (Nút màu xanh lá nổi bật).
- **Notifications**: Biểu tượng chuông thông báo có đếm số tin nhắn mới.
- **Admin Profile**: Avatar hình quản trị viên với tên hiển thị "Admin GreenNest (Quản trị viên)".

---

### C. Main Dashboard Content Area

#### 1. Standard KPI Summary Cards (Top Grid - 6 DB Collections)
- **Card 1: Tổng số Cây trồng (`plants`)**
  - Value: `128 Cây` (Đã đăng: 110 | Nháp: 18)
  - Visual Badge: 🪴 Icon Cây cảnh / Peashooter
- **Card 2: Chuyên gia (`gardeners`)**
  - Value: `15 Chuyên gia`
  - Visual Badge: 👨‍🌾 Icon Chuyên gia
- **Card 3: Bộ sưu tập (`collections`)**
  - Value: `8 Bộ sưu tập` (Nổi bật: 3)
  - Visual Badge: 🌻 Icon Hoa hướng dương / Sunflower
- **Card 4: Ảnh Thư viện (`galleries`)**
  - Value: `342 Hình ảnh`
  - Visual Badge: 🖼️ Icon Khung ảnh / Wall-nut
- **Card 5: Tin nhắn liên hệ (`contacts`)**
  - Value: `5 Chưa đọc`
  - Visual Badge: ✉️ Icon Tin nhắn
- **Card 6: Tài khoản người dùng (`users`)**
  - Value: `1,250 Tài khoản` (Admin: 4)
  - Visual Badge: 👤 Icon Người dùng

---

#### 2. Main Data Table: "Danh sách Cây trồng (`plants` Collection)"
- **Controls**: Bộ lọc Danh mục (Trong nhà, Ngoài trời), Ô tìm kiếm, Nút "+ Thêm Cây Mới".
- **Table Headers**: `Tên Cây / Tên Khoa Học`, `Danh Mục`, `Ánh Sáng & Nước`, `Cảnh Báo Độc Tính`, `Trạng Thái`, `Hành Động`.
- **Sample Rows**:
  1. **Monstera Deliciosa** (*Swiss Cheese Plant*) | Trong nhà / Bóng râm | Ánh sáng gián tiếp | ⚠️ Độc với thú cưng | `<Badge: Đã đăng (Xanh)>` | `[Sửa] [Xóa]`
  2. **Sen Đá Ngọc Bích** (*Crassula Ovata*) | Để bàn / Nắng nhẹ | Nắng trực tiếp | ✅ An toàn | `<Badge: Đã đăng (Xanh)>` | `[Sửa] [Xóa]`
  3. **Bonsai Cần Thăng** (*Feoniella Lucida*) | Ngoài trời | Nắng bán phần | ⚠️ Cần lưu ý | `<Badge: Bản nháp (Vàng)>` | `[Sửa] [Xóa]`

---

#### 3. Bottom Grid: "Tin nhắn Liên hệ Mới & Nhật ký Hoạt động"
- **Left Column: Tin nhắn Liên hệ gần đây (`contacts`)**
  - **Khách hàng**: Nguyễn Văn A (`a@gmail.com`) - *"Tư vấn giúp mình cách chăm sóc cây Monstera bị vàng lá"* -> `<Trạng thái: Chờ xử lý>`
  - **Khách hàng**: Trần Thị B (`b@gmail.com`) - *"Cho mình hỏi chi phí giao hàng cây cảnh khu vực nội thành"* -> `<Trạng thái: Đã xử lý>`
- **Right Column: Nhật ký Hoạt động Hệ thống**
  - "🌱 Tài khoản Admin vừa thêm cây mới *Sen Đá Ngọc Bích*."
  - "👨‍🌾 Đã cập nhật thông tin Chuyên gia *Nguyễn Văn C*."

---

## 3. Technical Requirements for Output
- Clean Tailwind CSS / HTML5 markup.
- Standard CMS layout suitable for MERN Stack React application (`frontend/src/pages/admin/Dashboard.jsx`).