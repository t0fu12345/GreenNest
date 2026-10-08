# Đăng nhập/Đăng ký (Auth) & Admin Dashboard

## 1. Auth Page (Đăng nhập/Đăng ký)
- Thiết kế chia nửa (Split screen layout) trên Desktop:
  - Một nửa màn hình là tấm ảnh nghệ thuật về lá cây/thiên nhiên siêu đẹp (người dùng cấp) trải full chiều cao.
  - Một nửa còn lại nền **Kem**, chứa Form đăng nhập đơn giản.
- **Form UI:** 
  - Ô input to (height 50px-60px), padding rộng, chỉ kẻ viền dưới (underline) hoặc viền mỏng toàn bộ. Không dùng border dày đặc.
  - Nút Submit bự chà bá, màu **Xanh Lá đậm**, hover sang **Vàng Cam**.
  - Không nhồi nhét quá nhiều text "Quên mật khẩu", "Đăng ký" lung tung. Giữ nó tối giản.

## 2. Admin Dashboard
Mặc dù là trang Admin nhưng cũng phải "sạch" và "tây", không dùng giao diện backend truyền thống kiểu cẩu thả.
- **Sidebar (Thanh điều hướng):** Nền tối (`#111827`) hoặc Xanh lá đậm. Các mục rõ ràng, padding rộng.
- **Data Table (Bảng dữ liệu Cây/Chuyên gia):**
  - Không kẻ bảng bằng những đường kẻ đen (border) ngang dọc rối mắt.
  - Chỉ kẻ đường border mỏng màu xám nhạt ngang giữa các dòng (row).
  - Ảnh thumbnail vuông vắn.
  - Các nút hành động (Edit/Delete) dùng icon nét mỏng, chỉ xuất hiện hoặc đổi màu khi di chuột vào (Hover state) để giữ bảng cực kỳ "clean".
