# Global Design System (GreenNest)

## 1. Core Philosophy (Tôn chỉ "Anti-AI Slop")
Dự án được thiết kế theo phong cách Editorial/Premium (giống tạp chí cao cấp), nói KHÔNG với thiết kế rườm rà, lộn xộn.

- **Less is More:** Tuyệt đối không nhồi nhét chữ (text-heavy). Đoạn văn ngắn gọn, súc tích (tối đa 2-3 dòng). Hạn chế thẻ `<p>` dài ngoằng.
- **Typography làm điểm nhấn (Bold & Beautiful):** Sử dụng font chữ to, tương phản mạnh. Không dùng font size bé (dưới 16px).
  - *Heading Font:* **Outfit**, **Playfair Display** hoặc **Lora** (tạo cảm giác tự nhiên, sang trọng).
  - *Body Font:* **Inter** hoặc **DM Sans** (sạch, hiện đại, dễ đọc, không chân).
- **Hình ảnh là linh hồn:** KHÔNG dùng ảnh minh họa vector/3D chung chung do AI render. Toàn bộ hình ảnh (background, thumbnail) dùng ảnh thực tế chất lượng cao (do người dùng cung cấp). Tránh lạm dụng bo góc tròn xoe (chỉ bo nhẹ 8px hoặc để góc vuông mạnh mẽ).
- **Không gian (Macro Whitespace):** Layout cực kỳ rộng rãi. Padding/Margin siêu lớn giữa các section (ví dụ: `py-24`, `py-32` trong Tailwind) để nội dung có không gian "thở".

## 2. Bảng màu (Color Palette)
- **Primary (Xanh lá):** `#1A4D2E` hoặc `#1E3F20` (Deep Forest Green). Mang lại sự chắc chắn, tĩnh lặng. Dùng cho Header, chữ tiêu đề bự, hoặc các khối nền lớn.
- **Accent (Vàng cam):** `#F5A623` hoặc `#E85D04` (Sunset Orange/Yellow). Màu của sự sống, sự chú ý. Dùng cho CTA (Nút bấm), badges, và hiệu ứng hover.
- **Background (Nền):** `#F9F8F4` hoặc `#FAF9F6` (Màu kem/Off-white). Tuyệt đối không dùng trắng tinh `#FFFFFF` làm nền chính. Màu kem giúp mắt dễ chịu, mang lại cảm giác organic, ấm áp.
- **Text (Chữ):** `#111827` (Dark Slate) cho nội dung chính, không dùng màu đen `#000000` tuyền.

## 3. UI Components Rules
- **Buttons (Nút bấm):** To, rõ ràng, padding rộng (Vd: `px-8 py-4`). Text trên nút đậm, to. Lạm dụng màu Vàng Cam cho CTA chính.
- **Cards (Thẻ):** Border siêu mỏng hoặc shadow cực kỳ tinh tế. Không dùng shadow đen sì.
- **Icons:** Sử dụng icon nét mỏng (Lucide/Feather), không dùng các icon cục mịch, đa màu sắc rườm rà.
