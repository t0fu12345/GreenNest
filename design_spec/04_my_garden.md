# Vườn của tôi (My Garden) & Care Checklist

## 1. Header Khu vườn
- Dùng màu xanh lá đặc trưng làm nền.
- Lời chào Typography cực lớn, cá nhân hóa: "Vườn của [Tên User]".

## 2. Giao diện Empty State (Khi vườn trống)
- Chống AI slop: Tuyệt đối không dùng vector illustration lộn xộn.
- Dùng 1 tấm ảnh thực tế, có tính nghệ thuật/tối giản (người dùng cấp) mờ nhẹ.
- Typography lớn bám giữa: "Vườn của bạn đang trống."
- Nút CTA to **Vàng Cam**: "Khám phá cây ngay".

## 3. Danh sách cây & Checklist (List View)
- Không dùng Grid Card ở đây nữa. Sử dụng dạng List (danh sách hàng ngang) để nhường chỗ cho Checklist chăm sóc.
- Mỗi hàng (row) bao gồm:
  - Ảnh thumbnail vuông vức bên trái.
  - Tên cây (chữ to, bold).
  - Phía bên phải (hoặc bên dưới trên mobile) là **Checklist**.
- **UI của Checklist:** 
  - Tránh các nút checkbox bé xíu mặc định của trình duyệt.
  - Xây dựng các thẻ tag có thể click. Ví dụ: `[ Đã tưới nước ]`, `[ Đã bón phân ]`.
  - Khi click vào (hoàn thành), thẻ có hiệu ứng mượt mà (chuyển sang màu Vàng Cam hoặc có dấu gạch ngang chữ êm ái), tạo sự thỏa mãn cho người dùng.
- **Nút Remove (Bỏ lưu):** Icon thùng rác nét mỏng, đặt ở góc khuất nhưng dễ bấm, hover sang màu đỏ.
