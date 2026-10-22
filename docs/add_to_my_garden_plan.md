# KẾ HOẠCH CHI TIẾT: TÍNH NĂNG "ADD TO MY GARDEN" & LOẠI BỎ NÚT DEMO TẠI SIGN IN

> **Dự án:** GreenNest (*The Living Canopy - Digital Botany Ecosystem*)  
> **Mục tiêu:** 
> 1. Xóa bỏ 2 nút điền thông tin demo (`⚡ Member` và `👑 Admin`) ở giao diện Đăng nhập (`Login.jsx`).
> 2. Hoàn thiện và kích hoạt tính năng **"Add to My Garden"** trên toàn bộ hệ thống (Trang chi tiết cây, Thẻ cây danh mục Herbarium, Modal xem nhanh Quick View, và Dashboard Vườn).
> 3. Tạo Git branch riêng biệt và commit toàn bộ thay đổi với thông điệp chuẩn mực.

---

## 1. PHÂN TÍCH HIỆN TRẠNG & VẤN ĐỀ CẦN GIẢI QUYẾT

### 1.1. Mục Đăng nhập (`frontend/src/pages/Login.jsx`)
- **Hiện trạng:** Đang chứa 2 nút tiện ích demo (`⚡ Member` tự động điền `minhthao` và `👑 Admin` tự động điền `admin`) cùng 2 hàm `fillDemoAccount`, `fillAdminAccount`.
- **Yêu cầu:** Xóa bỏ hoàn toàn 2 nút này cùng các hàm handler liên quan để chuẩn hóa giao diện đăng nhập cho người dùng thực tế, giữ nguyên checkbox "Remember session (Cookie)" và form đăng nhập chuẩn.

### 1.2. Tính năng "Add to My Garden"
- **Backend (`/api/garden`):**
  - Đã có router `POST /api/garden` nhận `{ plantId, customNickname }`.
  - Service `garden.service.js` đã hỗ trợ tra cứu cây theo `_id`, `specimenId`, `slug`, `catalogCode`, hoặc `name`, đồng thời thiết lập checklist chăm sóc ban đầu (`water`, `mist`, `fertilize`, `prune`).
- **Frontend Service (`frontend/src/services/gardenApi.js`):**
  - Đã có đầy đủ hàm gọi API: `getMyGarden()`, `addPlant(plantId, customNickname)`, `removePlant(id)`, `updateChecklist(...)`.
- **Thiếu sót trên Giao diện:**
  1. **`SpecimenDetail.jsx` (Trang chi tiết cây):** Đã có state `gardenPlantIds`, `isAddingToGarden` và hàm `handleAddToGarden()`, nhưng **chưa hề render nút "Add to My Garden"** trên thanh Action Bar của cây!
  2. **`Plants.jsx` (Danh mục Herbarium):** Chưa đồng bộ danh sách `gardenPlantIds` từ API khi load trang; chưa render nút "Add to Garden" trên từng thẻ cây và trong Quick View modal.
  3. **`Garden.jsx`:** Đã có giao diện vườn, cần đảm bảo component `AddPlantToGardenModal` hoạt động mượt mà khi người dùng thêm cây trực tiếp từ trong vườn.

---

## 2. KẾ HOẠCH TRIỂN KHAI CHI TIẾT THEO TỪNG TASK

### Task 1: Dọn dẹp form Đăng nhập (`frontend/src/pages/Login.jsx`)
- Xóa hàm `fillDemoAccount` và `fillAdminAccount`.
- Xóa phần hiển thị 2 button `⚡ Member` và `👑 Admin` trong khối `.form-options`.
- Giữ nguyên khối checkbox ghi nhớ tài khoản và form layout cân đối.

### Task 2: Kích hoạt nút "Add to My Garden" trên trang Chi tiết Cây (`frontend/src/pages/SpecimenDetail.jsx`)
- Kiểm tra trạng thái cây: nếu đã có trong vườn (`inGarden = true`), nút hiển thị dạng `🌿 In Your Garden` (click vào sẽ chuyển hướng đến `/garden` hoặc thông báo cây đã trong vườn).
- Nếu chưa có trong vườn, nút hiển thị `🌱 Add to My Garden` (với hiệu ứng loading khi đang thêm `Adding to Garden...`).
- Nếu chưa đăng nhập: nhắc nhở người dùng đăng nhập để lưu cây vào không gian vườn cá nhân.
- Render nút nổi bật trong thanh Action Bar cùng với `Save To Collection` và `Star Specimen`.

### Task 3: Tích hợp "Add to Garden" vào Danh mục Herbarium (`frontend/src/pages/Plants.jsx`)
- Trong `fetchUserSaved`: đồng bộ đồng thời cả danh sách yêu thích (`savedPlants`) và danh sách cây đã có trong vườn (`garden.plant`).
- Trên mỗi **Thẻ cây (Plant Card)**:
  - Thêm nút hành động nhanh:
    - Nếu đã trong vườn: badge/nút nhẹ `🌿 In Garden`.
    - Nếu chưa có: nút `🌱 + Garden` cho phép bấm thêm ngay lập tức kèm toast notification phản hồi tức thì.
- Trong **Modal Quick View** của cây:
  - Bổ sung nút bấm `"🌱 Add to My Garden"` bên cạnh nút Star và Xem hồ sơ đầy đủ.

### Task 4: Kiểm tra đồng bộ Component Modal Thêm Cây (`AddPlantToGardenModal.jsx` & `Garden.jsx`)
- Đảm bảo modal thêm cây trong `/garden` cho phép tìm kiếm cây, đặt biệt danh (`customNickname`) và tự động cập nhật danh sách vườn sau khi thêm thành công.
- Đảm bảo backend `garden.service.js` populate đầy đủ thông tin `plant` (bao gồm `slug`, `category`, `specimenId`).

### Task 5: Kiểm thử & Xác minh chất lượng
- Chạy `npm run build` ở thư mục `frontend` để kiểm tra toàn bộ cú pháp JSX, TypeScript/ESLint/Vite compile.
- Xác nhận không còn xuất hiện 2 nút demo trên giao diện đăng nhập.
- Xác nhận các nút "Add to My Garden" đã sẵn sàng hoạt động đồng nhất.

### Task 6: Phân nhánh Git & Commit
- Tạo nhánh mới: `feature/add-to-my-garden` từ nhánh hiện tại.
- Kiểm tra `git status` và `git diff` toàn bộ các tệp thay đổi.
- Thực hiện `git add` và commit với thông điệp:
  `feat: implement add to my garden feature and remove demo login buttons`

---
